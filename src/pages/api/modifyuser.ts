import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { User } from '@/model/model';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    switch (req.method) {
        case 'PUT':
            await handleUpdateUser(id, req, res);
            break;
        case 'DELETE':
            await handleDeleteUser(id, res);
            break;
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handleUpdateUser(id: string, req: NextApiRequest, res: NextApiResponse) {
    const { username, name, type, email, password }: User = req.body;

    if (!username && !name && !type && !email && !password) {
        return res.status(400).json({ message: 'At least one field is required' });
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (username) {
        fields.push(`username = $${index++}`);
        values.push(username);
    }
    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }
    if (type) {
        fields.push(`type = $${index++}`);
        values.push(type);
    }
    if (email) {
        fields.push(`email = $${index++}`);
        values.push(email);
    }
    if (password) {
        fields.push(`password = $${index++}`);
        values.push(password);
    }

    values.push(id);

    const updateQuery = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;

    try {
        const result = await query(updateQuery, values);
        const updatedUser = result.rows[0];
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated', user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handleDeleteUser(id: string, res: NextApiResponse) {
    try {
        const result = await query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        const deletedUser = result.rows[0];
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted', user: deletedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

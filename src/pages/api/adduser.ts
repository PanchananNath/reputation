import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';
import { User } from '@/model/model';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, name, type, email, password }: User = req.body;

        // Basic validation
        if (!username || !name || !type || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const result = await query(
                'INSERT INTO "user" (username, name, type, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [username, name, type, email, password]
            );
            const newUser = result.rows[0];
            return res.status(201).json({ message: 'User created', user: newUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { VNF } from '@/model/model';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid VNF ID' });
    }

    switch (req.method) {
        case 'PUT':
            await handleUpdateVNF(id, req, res);
            break;
        case 'DELETE':
            await handleDeleteVNF(id, res);
            break;
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handleUpdateVNF(id: string, req: NextApiRequest, res: NextApiResponse) {
    const { name, vendorid, hash, reputationscore, processor, memory, storage, bandwidth, security }: VNF = req.body;

    if (!name && !vendorid && !hash && reputationscore === undefined && !processor && !memory && !storage && !bandwidth && !security) {
        return res.status(400).json({ message: 'At least one field is required' });
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
        fields.push(`name = $${index++}`);
        values.push(name);
    }
    if (vendorid !== undefined) {
        fields.push(`vendorid = $${index++}`);
        values.push(vendorid);
    }
    if (hash) {
        fields.push(`hash = $${index++}`);
        values.push(hash);
    }
    if (reputationscore !== undefined) {
        fields.push(`reputationscore = $${index++}`);
        values.push(reputationscore);
    }
    if (processor) {
        fields.push(`processor = $${index++}`);
        values.push(processor);
    }
    if (memory) {
        fields.push(`memory = $${index++}`);
        values.push(memory);
    }
    if (storage) {
        fields.push(`storage = $${index++}`);
        values.push(storage);
    }
    if (bandwidth) {
        fields.push(`bandwidth = $${index++}`);
        values.push(bandwidth);
    }
    if (security) {
        fields.push(`security = $${index++}`);
        values.push(security);
    }

    values.push(id);

    const updateQuery = `UPDATE vnf SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;

    try {
        const result = await query(updateQuery, values);
        const updatedVNF = result.rows[0];
        if (!updatedVNF) {
            return res.status(404).json({ message: 'VNF not found' });
        }
        return res.status(200).json({ message: 'VNF updated', vnf: updatedVNF });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handleDeleteVNF(id: string, res: NextApiResponse) {
    try {
        const result = await query('DELETE FROM vnf WHERE id = $1 RETURNING *', [id]);
        const deletedVNF = result.rows[0];
        if (!deletedVNF) {
            return res.status(404).json({ message: 'VNF not found' });
        }
        return res.status(200).json({ message: 'VNF deleted', vnf: deletedVNF });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

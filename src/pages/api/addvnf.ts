import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { VNF } from '@/model/model';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, vendorid, hash, reputationscore, processor, memory, storage, bandwidth, security }: VNF = req.body;

        if (!name || !vendorid || !hash || reputationscore === undefined || !processor || !memory || !storage || !bandwidth || !security) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const result = await query(
                'INSERT INTO vnf (name, vendorid, hash, reputationscore, processor, memory, storage, bandwidth, security) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
                [name, vendorid, hash, reputationscore, processor, memory, storage, bandwidth, security]
            );
            const newVNF = result.rows[0];
            return res.status(201).json({ message: 'VNF created', vnf: newVNF });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { VNF } from '@/model/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userId = req.query.userid as string;

        try {
            const result = await query(
                'SELECT * FROM users WHERE id = $1',
                [userId]
            );

            const vnfList: VNF[] = result.rows;
            return res.status(200).json({ vnfList });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

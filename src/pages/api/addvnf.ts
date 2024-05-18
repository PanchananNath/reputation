import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { VNF } from '@/model/model';
import crypto from 'crypto';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, vendorid, processor, memory, storage, bandwidth, security,filepath }: VNF = req.body;
        console.log(req.body);
     
   
        try {
            
        const hash = crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(
            { name, vendorid, processor, memory, storage, bandwidth, security,filepath } 
        ))).then((buffer) => {
            const hashArray = Array.from(new Uint8Array(buffer));
            return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        });
   
        console.log(hash);
            const result = await query(
                'INSERT INTO vnf (name, vendorid, hash, reputationscore, processor, memory, storage, bandwidth, security,filepath) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
                [name, vendorid, hash, 0, processor, memory, storage, bandwidth, security,filepath]
            );
            const newVNF = result.rows[0];
            return res.status(201).json({ message: 'VNF created', vnf: newVNF });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        console.log(req.method);
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

interface VNF {
    id: number;
    name: string;
    vendorid: string;
    bandwidth: number;
    security: string;
    memory: number;
    processor: string;
    reputationscore: number;
    storage: number;
    hash: string;
    vendorname: string;
    score: number; 
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const result = await query(`
            SELECT 
            vnf.*, 
            users.name AS vendorname, 
            COALESCE(isp.avg_isp_score, 0) AS avg_isp_score, 
            COALESCE(subscriber.avg_subscriber_score, 0) AS avg_subscriber_score
            FROM 
                vnf 
            JOIN 
                users ON vnf.vendorid = users.id 
            LEFT JOIN 
                (
                    SELECT 
                        vnfid,
                        AVG(score) AS avg_isp_score
                    FROM 
                        isp_review
                    GROUP BY 
                        vnfid
                ) AS isp ON vnf.id = isp.vnfid 
            LEFT JOIN 
                (
                    SELECT 
                        vnfid,
                        AVG(score) AS avg_subscriber_score
                    FROM 
                        subscriber_review
                    GROUP BY 
                        vnfid
                ) AS subscriber ON vnf.id = subscriber.vnfid;
            
            `);

            const data: VNF[] = result.rows.map(row => ({
                id: row.id,
                name: row.name,
                vendorid: row.vendorid,
                bandwidth: row.bandwidth,
                security: row.security,
                memory: row.memory,
                processor: row.processor,
                reputationscore: row.reputationscore,
                storage: row.storage,
                hash: row.hash,
                vendorname: row.vendorname,
                score: (parseInt(row.avg_isp_score) + parseInt(row.avg_subscriber_score))  /2
            }));

            console.log(data);
            return res.status(200).json( data );
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { SubscriberReview } from '@/model/model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { vnfid, userid, bandwidthmatched, throughput, latency,score }: SubscriberReview = req.body;

        // Basic validation
        if (vnfid === undefined || userid === undefined || bandwidthmatched === undefined || throughput === undefined || latency === undefined || score === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const result = await query(
                `INSERT INTO subscriber_review (vnfid, userid, bandwidthmatched, throughput, latency,score) 
                VALUES ($1, $2, $3, $4, $5,$6) RETURNING id`,
                [vnfid, userid, bandwidthmatched, throughput, latency,score]
            );
            const newReview = result.rows[0];
            return res.status(201).json({ message: 'Subscriber Review created', review: newReview });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

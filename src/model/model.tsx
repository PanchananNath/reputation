export interface User {
    id: number;
    username: string;
    name: string;
    type: 'vendor' | 'isp' | 'subscriber';
    email: string;
    password: string;
}

export interface VNF {
    id: number;
    name: string;
    vendorid: number; // References User.id
    hash: string;
    reputationscore: number;
    processor: string;
    memory: string;
    storage: string;
    bandwidth: string;
    security: string;
    filepath: string;
}

export interface ISPReview {
    id: number;
    vnfid: number; // References VNF.id
    userid: number; // References User.id
    success: boolean;
    processormatched: boolean;
    memorymatched: boolean;
    storagematched: boolean;
    bandwidthmatched: boolean;
    securitymatched: boolean;
    throughput: string;
    latency: string;
    score: number;
}

export interface SubscriberReview {
    id: number;
    vnfid: number; // References VNF.id
    userid: number; // References User.id
    bandwidthmatched: boolean;
    throughput: string;
    latency: string;
    score: number;
}

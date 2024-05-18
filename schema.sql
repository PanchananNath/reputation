CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    name TEXT,
    type TEXT CHECK (type IN ('vendor', 'isp', 'subscriber')),
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE vnf (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    vendorid INTEGER REFERENCES users(id),
    hash TEXT,
    reputationscore INTEGER,
    processor TEXT,
    memory TEXT,
    storage TEXT,
    bandwidth TEXT,
    security TEXT
);

CREATE TABLE isp_review (
    id SERIAL PRIMARY KEY,
    vnfid INTEGER REFERENCES vnf(id),
    userid INTEGER REFERENCES users(id),
    success BOOLEAN,
    processormatched BOOLEAN,
    memorymatched BOOLEAN,
    storagematched BOOLEAN,
    bandwidthmatched BOOLEAN,
    securitymatched BOOLEAN,
    throughput TEXT,
    latency TEXT
);

CREATE TABLE subscriber_review (
    id SERIAL PRIMARY KEY,
    vnfid INTEGER REFERENCES vnf(id),
    userid INTEGER REFERENCES users(id),
    bandwidthmatched BOOLEAN,
    throughput TEXT,
    latency TEXT
);

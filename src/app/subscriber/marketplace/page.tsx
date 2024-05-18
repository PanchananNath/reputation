"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
export default function VNFList() {

    const [vnfs, setVnfs] = useState<VNF[]>([]);

    useEffect(() => {
       
        fetch(`/api/getvnfs`,{
            cache: 'no-cache',
        })
            .then((res) => res.json())
            .then((data) => {
                
                console.log(data);
                setVnfs(data);
            });
    }, []);
    
  return (
    <main className="p-24">
        <h1 className="text-4xl">Marketplace</h1>
        <div className="grid grid-cols-4 gap-5 mt-24">
        {vnfs && vnfs.map((vnf: VNF) => (
            <Card key={vnf.id} className=" shadow-md p-2">
                <CardContent>
                <h1 className="overflow-hidden ">Name: {vnf.name}</h1>
                <p>VendorName: {vnf.vendorname}</p>
                <p>bandwidth: {vnf.bandwidth}</p>
                <p> security: {vnf.security}</p>
                <p> memory: {vnf.memory}</p>
                <p> processor: {vnf.processor}</p>
                <p>storage: {vnf.storage}</p>
                <p> hash: {vnf.hash}</p>
                </CardContent>
                <CardFooter className="space-x-2" >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link href={`/subreview/${vnf.id}/1`}>Review</Link>
                    </button>
                    <p> Score : {vnf.score}</p>
                </CardFooter>
            </Card>
        ))}
        </div>
    </main>
  );
}

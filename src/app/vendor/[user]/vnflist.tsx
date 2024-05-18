"use client";
import { VNF } from "@/model/model";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function VNFList(props: {
    params: { user: string };
}) {

    const [vnfs, setVnfs] = useState<VNF[]>([]);

    useEffect(() => {
        console.log(props.params.user);
        fetch(`/api/getvnfuser?userid=${props.params.user}`)
            .then((res) => res.json())
            .then((data) => {
                
                console.log(data);
                setVnfs(data);
            });
    }, []);
    



  return (
    <main className="">
        {vnfs && vnfs.map((vnf: VNF) => (
            <div key={vnf.id} className="">
                <h1>Name: {vnf.name}</h1>
                <p>vendorid: {vnf.vendorid}</p>
                <p>bandwidth: {vnf.bandwidth}</p>
                <p> security: {vnf.security}</p>
                <p> memory: {vnf.memory}</p>
                <p> processor: {vnf.processor}</p>
                <p> reputationscore: {vnf.reputationscore}</p>
                <p>storage: {vnf.storage}</p>
                <p> hash: {vnf.hash}</p>

           
             
            </div>
        ))}

     
    </main>
  );
}

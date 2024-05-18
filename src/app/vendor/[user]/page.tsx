import Image from "next/image";
import VNFList from "./vnflist";



export default function VendorHome(props: {
    params: { user: string };
  }) {
   


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <VNFList params={{
              user: props.params.user,
          }}/>
    </main>
  );
}

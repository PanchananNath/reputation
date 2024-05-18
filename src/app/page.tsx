import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>
        <Link href={"/createvnf"}>Create VNF</Link>
      </Button>
      <Button>
        <Link href={"/isp/marketplace"}>ISP MarketPlace</Link>
      </Button>
      <Button>
        <Link href={"/subscriber/marketplace"}>Subscriber MarketPlace</Link>
      </Button>
      <Button>
        <Link href={"/ispreview/1/1"}>ISP  add review</Link>
      </Button>

     
    </main>
  );
}

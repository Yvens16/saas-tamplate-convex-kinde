import { Bell, Package2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function LogoLink() {
  return <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
    <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-75 text-[28px]">
      <Image
        width={8}
        height={8}
        className="h-8 w-auto cursor-pointer"
        src="/logo.svg"
        alt="logo"
      />
      ltradev
    </Link>
  </div>
}
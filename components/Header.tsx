"use client";

import Image from "next/image";
import Link from "next/link";
import CartSidebar from "./CartSide";
import useCartStore from "@/zustand/cartStore";

export default function Header() {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white ">
      <Link href="/">
        <Image src="/favicon.ico" width={40} height={40} alt="Logo" />
      </Link>

      <div className="flex items-center space-x-2.5 text-sm">
        <CartSidebar
          buttonVariant={"icon"}
          product={{
            id: 0,
            title: "",
            price: 0,
            description: "",
            category: "",
            image: "",
            rating: {
              rate: 0,
              count: 0,
            },
          }}
        />
      </div>
    </header>
  );
}

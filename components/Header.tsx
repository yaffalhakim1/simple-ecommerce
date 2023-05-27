"use client";

import Image from "next/image";
import Link from "next/link";
import CartSidebar from "./CartSide";
import useCartStore from "@/zustand/cartStore";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full bg-white mt-4">
      <Sidebar />
      <Link href="/">
        <Image src="/favicon.ico" width={40} height={40} alt="Logo" />
      </Link>
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
    </header>
  );
}

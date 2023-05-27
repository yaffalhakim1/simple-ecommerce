"use client";

import Product from "@/components/Product";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import useProductStore from "@/zustand/productsStore";
import Header from "@/components/Header";

export default async function Home() {
  const products = useProductStore((state) => state.products);
  const fetchAll = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen max-w-5xl justify-center md:mx-auto lg:px-0 mt-24 flex flex-row ">
        <section className="flex flex-col space-y-12 pb-44">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {products.map((product: any) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

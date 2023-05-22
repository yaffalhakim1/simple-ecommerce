"use client";

import Product from "@/components/Product";
import { Suspense } from "react";
import Loading from "./product/[id]/loading";
import {
  getAll,
  getElectronics,
  getJewelry,
  getManClothes,
  getWomanClothes,
} from "@/lib/products";

export default async function Home() {
  const [all, jewelry, electronics, manCloth, womanCloth] = await Promise.all([
    getAll(),
    getJewelry(),
    getElectronics(),
    getManClothes(),
    getWomanClothes(),
  ]);

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-24">
      <section className="flex flex-col space-y-12 pb-44">
        <h1 className="text-5xl font-bold text-center">The Products</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {/* <Suspense fallback={<Loading />}> */}
          {electronics.map((product) => (
            <Product key={product.id} product={product} />
          ))}
          {/* </Suspense> */}
        </div>
      </section>
    </main>
  );
}

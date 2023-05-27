"use client";

import Product from "@/components/Product";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import useProductStore from "@/zustand/productsStore";
import { useTokenCheck } from "@/lib/checkLogin";
import Cookie from "js-cookie";
import CartSidebar from "@/components/CartSide";
import Header from "@/components/Header";

export default async function Home() {
  const products = useProductStore((state) => state.products);
  const fetchAll = useProductStore((state) => state.fetchProducts);
  useTokenCheck();

  const router = useRouter();
  async function logout() {
    Cookie.remove("token");
    router.push("/auth/login");
  }

  useEffect(() => {
    // Fetch products for all categories initially
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      <div className="min-h-screen max-w-5xl mx-auto px-8 lg:px-0 mt-24 flex flex-row justify-evenly">
        {/* <Header /> */}
        <Sidebar />
        <section className="flex flex-col space-y-12 pb-44">
          <h1 className="text-5xl font-bold text-center">The Products</h1>
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

{
  /* <button
          onClick={() => {
            logout();
          }}
          className="button bg-red-600 text-white border-transparent hover:border-blue-600 hover:bg-blue-700 hover:text-white mt-5"
        >
          logout
        </button> */
}

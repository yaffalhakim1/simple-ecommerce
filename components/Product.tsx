import Link from "next/link";
import ProductImage from "./ProductImage";
import { useState } from "react";
import CartSidebar from "./CartSide";

type Props = {
  product: Product;
  onClick?: () => void | Promise<void>;
};

export default function Product({ product }: Props) {
  return (
    <div>
      <>
        <Link
          prefetch={false}
          href={`/product/${product.id}`}
          className="h-80 flex flex-col p-5 rounded border group hover:scale-105 transition-transform ease-out duration-200"
        >
          <div className="w-36 mx-auto">
            <ProductImage product={product} />
          </div>

          <div className="font-semibold flex items-center justify-between mt-4 mb-1">
            <p className="truncate w-44">{product.title}</p>
            <p>${product.price}</p>
          </div>

          <p className="italic text-xs w-64 line-clamp-2 text-gray-600">
            {product.description}
          </p>
        </Link>
        {/* 
          <button
            onClick={() => setIsCartOpen(true)}
            className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-blue-700 hover:text-white mt-5"
          >
            Add to cart
          </button> */}
        {/* {isCartOpen && <CartSidebar />} */}
      </>
    </div>
  );
}

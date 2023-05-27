"use client";

import ProductImage from "@/components/ProductImage";
import { notFound, useRouter } from "next/navigation";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import CartSidebar from "@/components/CartSide";
import { Suspense, useState } from "react";
import Loading from "./loading";

type Props = {
  params: {
    id: string;
  };
};

async function ProductDetail({ params: { id } }: Props) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: Product = await res.json();
    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 min-h-screen pb-10">
        <div className="md:flex gap-x-8 h-96">
          {product?.image && (
            <div className="relative w-72 h-full mx-auto  md:inline">
              <ProductImage product={product} fill />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <h4 className="font-semibold">{product?.title}</h4>
              <p className="font-medium text-sm">${product?.price}</p>
              <div className="flex items-center text-sm my-4">
                <p>{product?.rating.rate}</p>
                {product?.rating.rate && (
                  <div className="flex items-center ml-2 mr-6">
                    {/* Display 5 stars but display the rate ones as StarIconOutline  */}
                    {Array.from(
                      { length: Math.floor(product.rating.rate) },
                      (_, i) => (
                        <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
                      )
                    )}

                    {/* Display the rest of the stars as StarIconOutline  */}
                    {Array.from(
                      { length: 5 - Math.floor(product.rating.rate) },
                      (_, i) => (
                        <StarIconOutline
                          key={i}
                          className="h-4 w-4 text-yellow-500"
                        />
                      )
                    )}
                  </div>
                )}
                <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                  See all {product?.rating.count} reviews
                </p>
              </div>

              <p className="line-clamp-5 text-sm mb-5">
                {product?.description}
              </p>
            </div>
            <CartSidebar
              buttonVariant={"text"}
              id={undefined}
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description,
                category: product.category,
                rating: product.rating,
              }}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
export default ProductDetail;

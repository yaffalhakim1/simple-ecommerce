"use client";

import ProductImage from "@/components/ProductImage";
import { notFound, useRouter } from "next/navigation";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
  params: {
    id: string;
  };
};

async function ProductDetail({ params: { id } }: Props) {
  const router = useRouter();

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: Product = await res.json();
    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
        <div className="flex gap-x-8 h-96">
          {product?.image && (
            <div className="relative w-72 h-full hidden md:inline">
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

              <p className="line-clamp-5 text-sm">{product?.description}</p>
            </div>

            <div className="space-y-3 text-sm">
              <button className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
                Add to bag
              </button>
              <button
                onClick={() => router.push(`/product/${product?.id}`)}
                className="button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
              >
                View full details
              </button>
            </div>
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

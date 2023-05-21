import ProductImage from "@/components/ProductImage";
import { notFound } from "next/navigation";

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
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
        <ProductImage product={product} />

        <div className="divide-y">
          <div className="sapce-y-2 pb-8">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
              ${product.price}
            </h2>
          </div>

          <div className="pt-8">
            <h3 className="text-xs md:text-sm">{product.description}</h3>
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

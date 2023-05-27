import Image from "next/image";
import useCartStore from "@/zustand/cartStore";
import { XIcon } from "./Icons";

type CartItemProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  removeFromCart: (id: number) => void;
};

function CartItem({ id, title, image, price, removeFromCart }: CartItemProps) {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeFromCart);

  const cartItem = cartItems.find((item) => item.product.id === id);

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };
  const handleRemoveItem = () => {
    removeFromCart(id);
  };

  const totalPrice = (cartItem?.quantity || 0) * price;

  return (
    <div className="justify-between rounded-lg bg-white my-4 sm:flex sm:justify-start">
      <div className="">
        <Image
          src={image}
          alt="product-image"
          className="rounded-lg sm:w-40"
          width={80}
          height={80}
        />
      </div>

      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between ">
        <div className="mt-5 sm:mt-0 space-y-2">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <div className="flex items-center text-center border-gray-100">
            <span
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => handleQuantityChange(cartItem!.quantity - 1 || 0)}
            >
              -
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              placeholder="2"
              value={cartItem?.quantity}
              min="1"
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value, 10))
              }
            />
            <span
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={() => handleQuantityChange(cartItem!.quantity + 1 || 1)}
            >
              +
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">${totalPrice}</p>
            <button onClick={handleRemoveItem}>
              <XIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

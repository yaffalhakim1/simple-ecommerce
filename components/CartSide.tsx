import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CartItem from "./CartItem";
import { CartIcon, XIcon } from "./Icons";
import useCartStore from "@/zustand/cartStore";
// import { remove } from "js-cookie";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartSidebarProps {
  isOpened?: boolean;
  onClose?: () => void;
  openCart?: () => void;
  buttonVariant: "text" | "icon";

  product: Product;
}
const CartSidebar = ({
  buttonVariant,

  product,
}: CartSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeSidebar() {
    setIsOpen(false);
  }
  function open() {
    setIsOpen(true);
  }

  const cartItems = useCartStore((state) => state.cartItems);

  const addToCart = useCartStore((state) => state.addToCart);
  const handleAddToCart = () => {
    addToCart(product);
  };
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const computeTotalPrice = useCartStore((state) => state.priceTotal);
  const router = useRouter();

  return (
    <>
      <button
        className={` ${
          buttonVariant === "icon" ? "md:hover:scale-110" : "button bg-blue-600"
        } text-white  hover:text-white`}
        onClick={() => {
          open();
          if (buttonVariant !== "icon") {
            handleAddToCart();
          }
        }}
      >
        {buttonVariant === "icon" ? (
          <CartIcon
            className="text-center text-black"
            width="40px"
            height="40px"
          />
        ) : (
          "Add to Cart"
        )}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeSidebar}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="fixed inset-0 ">
              <Dialog.Panel className="fixed top-0 right-0 z-40 h-full max-w-md bg-white md:w-5/12">
                {/* Sidebar Content */}
                <div className="flex flex-col justify-between h-full">
                  <div className="flex justify-between px-4">
                    <p className="mt-3 text-lg font-semibold">Your Cart</p>
                    <button
                      className="mt-3"
                      onClick={closeSidebar}
                      aria-label="Close"
                    >
                      <XIcon />
                    </button>
                  </div>
                  {cartItems.length > 0 ? (
                    <div className="flex flex-col justify-between mx-auto overflow-hidden">
                      <div className="h-screen px-4 overflow-y-scroll">
                        {cartItems.map((product) => (
                          <CartItem
                            key={product.product.id}
                            id={product.product.id}
                            title={product.product.title}
                            price={product.product.price}
                            description={product.product.description}
                            image={product.product.image}
                            removeFromCart={removeFromCart}
                          />
                        ))}
                      </div>
                      <div className="pt-1 border-t border-gray-400 border-spacing-x-2">
                        <div className="flex flex-col justify-between my-2">
                          <div className="flex items-center justify-between px-4 mb-2">
                            <p>Subtotal</p>
                            <p>{computeTotalPrice()}</p>
                          </div>
                          <div className="flex items-center justify-between px-4 mb-2">
                            <p>Taxes</p>
                            <p>$5.00</p>
                          </div>
                          <div className="flex items-center justify-between px-4 mb-2">
                            <p>Shipping</p>
                            <p>$5.00</p>
                          </div>
                          <div className="pt-1 border-t border-gray-400"></div>
                          <div className="flex items-center justify-between px-4">
                            <p className="font-semibold">Total</p>
                            <p className="font-semibold">
                              {computeTotalPrice() + 10}
                            </p>
                          </div>
                          {/* <Link href="/coming"> */}
                          <button
                            onClick={() => router.push("/coming")}
                            className="mx-4 mt-2 leading-relaxed text-white bg-blue-600 border-transparent button hover:border-blue-600 hover:bg-blue-700 hover:text-white"
                          >
                            PROCEED TO PAYMENT
                          </button>
                          {/* </Link> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="mb-4 text-center text-gray-500">
                        Your Cart is empty
                      </p>
                      <Button
                        variant="text"
                        onClick={() => {
                          closeSidebar();
                        }}
                        title="Continue Shopping"
                      />
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default CartSidebar;

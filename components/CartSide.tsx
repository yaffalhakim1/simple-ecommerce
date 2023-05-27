import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CartItem from "./CartItem";
import { CartIcon, XIcon } from "./Icons";
import useCartStore from "@/zustand/cartStore";
import { remove } from "js-cookie";

interface CartSidebarProps {
  isOpened?: boolean;
  onClose?: () => void;
  openCart?: () => void;
  buttonVariant: "text" | "icon";
  id: any;
  product: Product;
}
const CartSidebar = ({
  isOpened,
  onClose,
  openCart,
  buttonVariant,
  id,
  product,
}: CartSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

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

  return (
    <>
      <button
        className={`button ${
          buttonVariant === "icon"
            ? "bg-transparent hover:bg-transparent hover:border-transparent hover:scale-110"
            : "bg-blue-600"
        } text-white border-transparent hover:border-blue-600 hover:bg-blue-700 hover:text-white mt-5`}
        onClick={() => {
          open();
          if (buttonVariant !== "icon") {
            handleAddToCart();
          }
        }}
      >
        {buttonVariant === "icon" ? (
          <CartIcon
            className="text-lg text-blue-600"
            width="32px"
            height="32px"
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
              <Dialog.Panel className="fixed top-0 right-0 z-40 md:w-5/12  h-full max-w-md bg-white">
                {/* Sidebar Content */}
                <div className="flex flex-col h-full justify-between">
                  <div className="flex px-4 justify-between">
                    <p className="text-lg font-semibold mt-3">Your Cart</p>
                    <button
                      className="mt-3"
                      onClick={closeSidebar}
                      aria-label="Close"
                    >
                      <XIcon />
                    </button>
                  </div>
                  <div className="flex flex-col  justify-between mx-auto overflow-hidden">
                    <div className="px-4 h-screen overflow-y-scroll ">
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
                  </div>
                  <div className="border-t border-gray-400 border-spacing-x-2 pt-1">
                    <div className="flex flex-col justify-between my-2">
                      <div className="mb-2 flex items-center justify-between px-4 ">
                        <p>Subtotal</p>
                        <p>{cartItems.length > 0 ? computeTotalPrice() : 0}</p>
                      </div>
                      <div className="mb-2 flex items-center justify-between px-4">
                        <p>Taxes</p>
                        <p>$5.00</p>
                      </div>
                      <div className="mb-2 flex items-center justify-between px-4 ">
                        <p>Shipping</p>
                        <p>$5.00</p>
                      </div>
                      <div className="border-t border-gray-400 pt-1 "></div>
                      <div className=" flex items-center justify-between px-4 ">
                        <p className="font-semibold">Total</p>
                        <p className="font-semibold">
                          {cartItems.length > 0 ? computeTotalPrice() + 10 : 0}
                        </p>
                      </div>
                      <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-blue-700 hover:text-white mt-2 leading-relaxed mx-4">
                        PROCEED TO PAYMENT
                      </button>
                    </div>
                  </div>
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

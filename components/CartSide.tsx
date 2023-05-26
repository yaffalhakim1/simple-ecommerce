import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CartItem from "./CartItem";
import { XIcon } from "./Icons";

const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeSidebar() {
    setIsOpen(false);
  }
  function open() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-blue-700 hover:text-white mt-5"
        onClick={open}
      >
        Add to Cart{" "}
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
              <Dialog.Panel className="fixed top-0 right-0 z-40 w-full h-full max-w-md bg-white">
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
                  <div className="flex flex-col  justify-between overflow-hidden">
                    <div className="px-4 h-screen overflow-y-scroll">
                      <CartItem />
                      <CartItem />
                      <CartItem />
                      <CartItem />
                      <CartItem />
                    </div>
                  </div>
                  <div className="border-t border-gray-400 pt-1">
                    <div className="flex flex-col justify-between my-2">
                      <div className="mb-2 flex items-center justify-between px-2 ">
                        <p>Subtotal</p>
                        <p>$5.00</p>
                      </div>
                      <div className="mb-2 flex items-center justify-between px-2">
                        <p>Taxes</p>
                        <p>$5.00</p>
                      </div>
                      <div className="mb-2 flex items-center justify-between px-2 border-b border-gray-400">
                        <p>Shipping</p>
                        <p>$5.00</p>
                      </div>
                      <div className=" flex items-center justify-between px-2 ">
                        <p className="font-semibold">Total</p>
                        <p>$5.00</p>
                      </div>
                      <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-blue-700 hover:text-white mt-2 mx-1 leading-relaxed">
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
      {/* Overlay to cover the whole screen */}
      {/* {isOpen && <div className="fixed inset-0 bg-black opacity-50"></div>} */}
    </>
  );
};

export default CartSidebar;

import { useState, useEffect, useRef } from "react";
import CartItem from "./CartItem";
import Overlay from "./Overlay";

const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-40 w-86 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:translate-x-0 ml-8 bg-white`}
      >
        {/* Sidebar Content */}
        <div className="px-4">
          <h2 className="text-lg font-semibold mt-3">Your Cart</h2>
          <CartItem />
          <CartItem />
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;

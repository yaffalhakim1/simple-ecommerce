import { useState, useEffect, useRef } from "react";
import CartItem from "./CartItem";
import Overlay from "./Overlay";
import { useSpring, animated } from "@react-spring/web";
import { useWindowSize } from "react-use";
import { XIcon } from "./Icons";

const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const isMobile = width < 768;

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
    // closeProps;
    console.log(isOpen);
  };

  const props = useSpring({
    from: { opacity: 0, transform: "translateX(100%)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: { duration: 200 },
  });

  const closeProps = useSpring({
    from: { opacity: 1, transform: "translateX(0)" },
    to: { opacity: 0, transform: "translateX(100%)" },
    config: { duration: 200 },
  });

  const sidebarAnimation = isOpen ? props : closeProps;
  return (
    <>
      {isMobile && (
        <animated.aside
          ref={sidebarRef}
          // className="fixed top-0 right-0 z-40 w-full h-screen bg-white "
          className={`fixed top-0 right-0 z-40 w-full  bg-white  transition-transform ${
            isOpen ? { sidebarAnimation } : {}
          } sm:translate-x-0 `}
          style={props}
        >
          {/* Sidebar Content */}
          <div className="px-4 overflow-y-auto h-screen  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div className="flex px-4 ">
              <h2 className="text-lg font-semibold mt-3">Your Cart</h2>
              <button className="ml-auto mt-3" onClick={toggleSidebar}>
                <XIcon />
              </button>
            </div>

            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </animated.aside>
      )}
      {!isMobile && (
        <animated.aside
          ref={sidebarRef}
          style={props}
          className={`fixed top-0 right-0 z-40 w-86 h-screen  ml-8 bg-white`}
        >
          {/* Sidebar Content */}
          <div className="px-4">
            <h2 className="text-lg font-semibold mt-3">Your Cart</h2>
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
        </animated.aside>
      )}
    </>
  );
};

export default CartSidebar;
// transition-transform ${
//   isOpen ? "translate-x-0" : "translate-x-full"
// } sm:translate-x-0

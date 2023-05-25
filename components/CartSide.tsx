import React from "react";
import CartItem from "./CartItem";

const CartSidebar = () => {
  // Cart sidebar content and styling

  return (
    <aside className="fixed top-0 right-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-24 ml-8 bg-blue-300">
      {/* Sidebar Content */}
      <div className="px-4 py-3">
        <h2 className="mb-2 text-lg font-semibold">Your Cart</h2>
        <CartItem />
      </div>
    </aside>
  );
};

export default CartSidebar;

{
  /* <ul className="space-y-2">
{categories.map((category) => (
  <li
    key={category}
    onClick={() => handleCategoryClick(category)}
    onTouchStart={() => handleCategoryClick(category)}
    className={`cursor-pointer ${
      selectedCategory === category ? "text-blue-500" : ""
    } hover:text-blue-500 text-md`}
  >
    {category}
  </li>
))}
</ul> */
}

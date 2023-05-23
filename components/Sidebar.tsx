"use client";
import React, { useEffect, useRef, useState } from "react";
import useProductStore from "@/zustand/productsStore";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const selectedCategory = useProductStore((state) => state.selectedCategory);
  const setSelectedCategory = useProductStore(
    (state) => state.setSelectedCategory
  );
  const fetchProductsByCategory = useProductStore(
    (state) => state.fetchProductsByCategory
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category);
  };

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add event listeners to detect clicks and touches outside the sidebar
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      // Clean up the event listeners when the component unmounts
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    // Close the sidebar if it's open and the click/touch is outside of it
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button className="block sm:hidden" onClick={toggleSidebar}>
        Open Sidebar
      </button>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-60 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 mt-24 md:ml-8 sm:ml-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-transparent">
          <h2 className="mb-2 text-lg">Categories</h2>
          <ul className="space-y-2">
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
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;

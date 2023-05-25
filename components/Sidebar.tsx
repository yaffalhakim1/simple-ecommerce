"use client";
import React, { useEffect, useRef, useState } from "react";
import useProductStore from "@/zustand/productsStore";
import { useWindowSize } from "react-use";
import { useTransition, animated } from "@react-spring/web";
import Overlay from "./Overlay";

function Sidebar() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const sort = ["desc", "asc"];
  const [isMounted, setIsMounted] = useState(false);
  const bottomSheetRef = useRef<HTMLInputElement | null>(null);
  const { width } = useWindowSize();
  const selectedCategory = useProductStore((state) => state.selectedCategory);
  const setSelectedCategory = useProductStore(
    (state) => state.setSelectedCategory
  );
  const selectedSort = useProductStore((state) => state.selectedSort);
  const setSelectedSort = useProductStore((state) => state.setSelectedSort);
  const fetchProductsByCategoryandSort = useProductStore(
    (state) => state.fetchProductsByCategoryandSort
  );

  const handleCategoryAndSortClick = (category: string, sort: string) => {
    setSelectedCategory(category);
    setSelectedSort(sort);
    fetchProductsByCategoryandSort(category, sort);
  };

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    // Close the sidebar if it's open and the click/touch is outside of it
    if (
      isBottomSheetOpen &&
      bottomSheetRef.current &&
      !bottomSheetRef.current.contains(event.target as Node)
    ) {
      setIsBottomSheetOpen(false);
    }
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const transitions = useTransition(isBottomSheetOpen, () => ({
    from: { transitions: "translateY(0%)" },
    enter: { transitions: "translateY(100)" },
    leave: { transitions: "translateY(0%)" },
  }));

  return (
    <>
      {isMounted && (
        <>
          {width <= 768 ? (
            <>
              <button
                className="block sm:hidden mb-5 text-lg font-semibold"
                onClick={toggleBottomSheet}
              >
                Filters
              </button>
              {isBottomSheetOpen && (
                <Overlay
                  isOpen={isBottomSheetOpen}
                  toggleBottomSheet={toggleBottomSheet}
                  ref={bottomSheetRef}
                />
              )}

              {transitions.map((item: any) =>
                item ? (
                  <animated.div
                    key={item}
                    ref={bottomSheetRef}
                    className={`fixed bottom-0 left-0 z-30 w-full h-64 bg-white p-4 transition-transform rounded rounded-tl-lg rounded-tr-lg ${
                      isBottomSheetOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                  >
                    <div className="px-4 py-3 h-full overflow-y-auto">
                      <h2 className="mb-2 text-lg font-semibold">Categories</h2>
                      <ul className="space-y-2">
                        {categories.map((category) => (
                          <li
                            key={category}
                            onClick={() =>
                              handleCategoryAndSortClick(
                                category,
                                selectedSort!
                              )
                            }
                            onTouchStart={() =>
                              handleCategoryAndSortClick(
                                category,
                                selectedSort!
                              )
                            }
                            className={`cursor-pointer ${
                              selectedCategory === category
                                ? "text-blue-500"
                                : ""
                            }`}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                      <h2 className="mb-2 text-lg font-semibold mt-5">
                        Sort By
                      </h2>
                      <ul className="space-y-2">
                        {sort.map((sort) => (
                          <li
                            key={sort}
                            onClick={() =>
                              handleCategoryAndSortClick(
                                selectedCategory!,
                                sort
                              )
                            }
                            onTouchStart={() =>
                              handleCategoryAndSortClick(
                                selectedCategory!,
                                sort
                              )
                            }
                            className={`cursor-pointer ${
                              selectedSort === sort
                                ? "text-blue-500 font-semibold"
                                : ""
                            } hover:text-blue-500 text-md`}
                          >
                            {sort}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </animated.div>
                ) : null
              )}
            </>
          ) : (
            <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full  sm:translate-x-0 mt-24 ml-8">
              {/* Sidebar Content */}
              <div className="px-4 py-3">
                <h2 className="mb-2 text-lg font-semibold">Categories</h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li
                      key={category}
                      onClick={() =>
                        handleCategoryAndSortClick(category, selectedSort!)
                      }
                      onTouchStart={() =>
                        handleCategoryAndSortClick(category, selectedSort!)
                      }
                      className={`cursor-pointer ${
                        selectedCategory === category
                          ? "text-blue-500 font-semibold"
                          : ""
                      } hover:text-blue-500 text-md`}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <h2 className="mb-2 text-lg font-semibold mt-5">Sort By</h2>
                <ul className="space-y-2">
                  {sort.map((sort) => (
                    <li
                      key={sort}
                      onClick={() =>
                        handleCategoryAndSortClick(selectedCategory!, sort)
                      }
                      onTouchStart={() =>
                        handleCategoryAndSortClick(selectedCategory!, sort)
                      }
                      className={`cursor-pointer ${
                        selectedSort === sort
                          ? "text-blue-500 font-semibold"
                          : ""
                      } hover:text-blue-500 text-md`}
                    >
                      {sort}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </>
      )}
    </>
  );
}

export default Sidebar;

{
  /* {isBottomSheetOpen && (
                <Overlay
                  isOpen={isBottomSheetOpen}
                  toggleBottomSheet={toggleBottomSheet}
                  ref={bottomSheetRef!}
                />
              )} */
}

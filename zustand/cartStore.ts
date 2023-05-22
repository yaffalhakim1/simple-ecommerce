import { create } from "zustand";

import axios from "axios";
import { BASE_URL } from "@/lib/shared";

// Define the type for your cart item
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Define the type for your cart store
type CartStore = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

// Create the cart store
export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addItem: async (item: any) => {
    try {
      // Make API request to add item to cart
      axios.post(`${BASE_URL}/carts/addCart`, item, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Update the local state
      set((state) => ({ cartItems: [...state.cartItems, item] }));
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  },
  removeItem: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

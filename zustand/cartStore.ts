import { create } from "zustand";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  priceTotal: () => number;
};

const useCartStore = create<CartStore>((set) => ({
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],

  addToCart: (product: Product) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        return {
          cartItems: state.cartItems.map((item) =>
            item.product.id === product.id ? updatedItem : item
          ),
        };
      } else {
        const newItem = { product, quantity: 1 };
        return { cartItems: [...state.cartItems, newItem] };
      }
    });
  },

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product.id !== id),
    })),

  updateQuantity: (productId: number, quantity: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  priceTotal: () => {
    let total = 0;
    useCartStore.getState().cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  },
}));

useCartStore.subscribe((state) => {
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
});

export default useCartStore;

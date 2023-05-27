// // localStorage.ts

// // Type for cart item
// interface CartItem {
//     id: string;
//     title: string;
//     price: number;
//     description: string;
//     image: string;
//   }

//   // Function to retrieve cart items from localStorage
//   export const getCartItemsFromLocalStorage = (): CartItem[] => {
//     if (typeof localStorage !== "undefined" && localStorage.getItem("cartItems")) {
//       return JSON.parse(localStorage.getItem("cartItems")) as CartItem[];
//     }
//     return [];
//   };

//   // Function to update cart items in localStorage
//   export const updateCartItemsInLocalStorage = (cartItems: CartItem[]): void => {
//     if (typeof localStorage !== "undefined") {
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     }
//   };

"use client";
import { create } from "zustand";

type ProductStore = {
  products: [];
  selectedCategory: string | null;
  selectedSort: string | null;
  setSelectedSort: (sort: string) => void;
  setSelectedCategory: (category: string) => void;
  fetchProductsByCategory: (category: string) => Promise<void>;
  fetchProductsByCategoryandSort: (
    category: string,
    sort: string | null
  ) => Promise<void>;
  fetchProductsBySort: (sort: string) => Promise<void>;

  fetchProducts: () => Promise<void>;
  fetchJewelry: () => Promise<void>;
  fetchElectronics: () => Promise<void>;
  fetchManClothes: () => Promise<void>;
  fetchWomanClothes: () => Promise<void>;
};

const useProductStore = create<ProductStore>((set) => ({
  selectedSort: null,
  setSelectedSort: (sort: string) => {
    set({ selectedSort: sort });
  },
  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
  },
  products: [],
  selectedCategory: null,
  fetchProductsByCategory: async (category: string) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const products = await response.json();
      set({ products });
    } catch (error) {
      console.error(`Failed to fetch ${category} products:`, error);
    }
  },
  fetchProductsByCategoryandSort: async (
    category: string,
    sort: string | null
  ) => {
    try {
      let url = `https://fakestoreapi.com/products/category/${category}`;

      if (sort) {
        url += `?sort=${sort}`;
      }

      const response = await fetch(url);
      const products = await response.json();
      set({ products });
    } catch (error) {
      console.error(`Failed to fetch ${category} products:`, error);
    }
  },

  fetchProductsBySort: async (sort: string) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?sort=${sort}`
      );
      const products = await response.json();
      set({ products });
    } catch (error) {
      console.error(`Failed to fetch ${sort} products:`, error);
    }
  },

  fetchProducts: async () => {
    try {
      const all = await fetch("https://fakestoreapi.com/products");
      const products = await all.json();
      set({ products });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
  fetchJewelry: async () => {
    try {
      const jewelry = await fetch(
        "https://fakestoreapi.com/products/category/jewelery"
      );
      const products = await jewelry.json();
      set({ products });
    } catch (error) {
      console.error("Failed to fetch jewelry products:", error);
    }
  },
  fetchElectronics: async () => {
    try {
      const electronics = await fetch(
        "https://fakestoreapi.com/products/category/electronics"
      );
      const products = await electronics.json();
      set({ products });
    } catch (error) {
      console.error("Failed to fetch electronics products:", error);
    }
  },
  fetchManClothes: async () => {
    try {
      const manCloth = await fetch(
        "https://fakestoreapi.com/products/category/men%20clothing"
      );
      const products = await manCloth.json();
      set({ products });
    } catch (error) {
      console.error("Failed to fetch men clothing products:", error);
    }
  },
  fetchWomanClothes: async () => {
    try {
      const womanCloth = await fetch(
        "https://fakestoreapi.com/products/category/women%20clothing"
      );
      const products = await womanCloth.json();
      set({ products });
    } catch (error) {
      console.error("Failed to fetch women clothing products:", error);
    }
  },
}));

export default useProductStore;

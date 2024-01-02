"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface State {
  cartItems: CartItem[];
}

interface Action {
  addProductToCart: (item: CartItem) => void;
  incrementAmount: (id: number) => void;
  decrementAmount: (id: number) => void;
  removeAllProducts: () => void;
}

const useStore = create<State & Action, [["zustand/persist", State & Action]]>(
  persist(
    (set, get) => ({
      cartItems: [],
      addProductToCart: (item: CartItem) =>
        set((state) => ({ cartItems: [...state.cartItems, item] })),
      incrementAmount: (id: number) =>
        set((state) => ({
          cartItems: state.cartItems.map((item, index) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrementAmount: (id: number) =>
        set((state) => ({
          cartItems: state.cartItems.map((item, index) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        })),
      removeAllProducts: () => set((_) => ({ cartItems: [] })),
    }),
    {
      name: "audiophile-cart",
      getStorage: () => ({
        setItem: (...args) => window.localStorage.setItem(...args),
        removeItem: (...args) => window.localStorage.removeItem(...args),
        getItem: async (...args) =>
          new Promise((resolve) => {
            if (typeof window === "undefined") {
              resolve(null);
            } else {
              setTimeout(() => {
                resolve(window.localStorage.getItem(...args));
              }, 0);
            }
          }),
      }),
    }
  )
);

export default useStore;

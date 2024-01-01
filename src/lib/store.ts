"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface State {
  cartItems: CartItem[];
}

interface Action {
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
            index === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrementAmount: (id: number) =>
        set((state) => ({
          cartItems: state.cartItems.map((item, index) =>
            index === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        })),
      removeAllProducts: () => set((_) => ({ cartItems: [] })),
    }),
    {
      name: "audiophile-cart", // name of the item in the storage (must be unique)
    }
  )
);

export default useStore;

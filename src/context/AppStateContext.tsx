
'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '@/types';

interface AppState {
  scrollToFormItem: Product | null;
  setScrollToFormItem: (item: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollToFormItem, setScrollToFormItem] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (scrollToFormItem) {
      const orderFormSection = document.getElementById('order-form-section');
      if (orderFormSection) {
        orderFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [scrollToFormItem]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setScrollToFormItem(product); // Scroll to form when item is added
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppStateContext.Provider value={{ scrollToFormItem, setScrollToFormItem, cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppState => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

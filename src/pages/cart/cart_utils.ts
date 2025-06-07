import { createContext, useContext } from 'react';

import { ProductDetails } from '../details/clearObject';

export const checkCart = (): string | null => {
  if (localStorage.getItem('cart_id')) {
    return localStorage.getItem('cart_id');
  }
  return '';
};

export interface CartContextType {
  cartItems: ProductDetails[];
  addToCart: (item: ProductDetails) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

import { createContext, useContext, useState, ReactNode } from 'react';
import { ProductDetails } from '../../pages/details/clearObject';

interface CartContextType {
  cartItems: ProductDetails[];
  addToCart: (item: ProductDetails) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductDetails[]>([]);

  const addToCart = (item: ProductDetails) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must use in CartProvider');
  }
  return context;
};

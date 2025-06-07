import { ReactNode, useCallback, useMemo, useState } from 'react';

import { CartContext } from '../../pages/cart/cart_utils';
import { ProductDetails } from '../../pages/details/clearObject';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductDetails[]>([]);

  const addToCart = useCallback((item: ProductDetails) => {
    setCartItems(prevCart => [...prevCart, item]);
  }, []);

  const value = useMemo(
    () => ({ cartItems, addToCart }),
    [cartItems, addToCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

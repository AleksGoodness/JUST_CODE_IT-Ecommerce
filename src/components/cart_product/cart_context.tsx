import { ReactNode, useCallback, useMemo, useState } from 'react';

import { CartContext } from '../../pages/cart/cart_utils';
import { ProductDetails } from '../../pages/details/clearObject';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductDetails[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [version, setVersion] = useState<number>(1);

  const addToCart = useCallback((item: ProductDetails) => {
    setCartItems(prevCart => [...prevCart, item]);
    setVersion(prevVersion => prevVersion + 1);
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      addToCart,
      cartId,
      setCartId,
      version,
      setVersion,
    }),
    [cartItems, setCartItems, addToCart, cartId, version, setVersion],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

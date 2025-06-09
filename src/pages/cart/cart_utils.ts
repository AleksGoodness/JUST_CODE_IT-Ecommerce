import { createContext, useContext } from 'react';

import { ProductDetails } from '../details/clearObject';
import { addToCartApi } from './cart_api';

const authHeader = btoa(
  `${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`,
);

export interface CartContextType {
  cartItems: ProductDetails[];
  setCartItems: (items: ProductDetails[]) => void;
  addToCart: (item: ProductDetails) => void;
  cartId: string | null;
  setCartId: (id: string | null) => void;
  version: number;
  setVersion: (version: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const useCartAdd = () => {
  const { cartId, setCartItems, setCartId, version, setVersion } = useCart();

  const addItemToCart = async (item: ProductDetails) => {
    if (!cartId) {
      console.error('Error: `cartId` is missing');
      return;
    }
    try {
      const cleanedCart = await addToCartApi(cartId, item, version);
      setCartItems(cleanedCart.products);
      setCartId(cleanedCart.id);
      setVersion(cleanedCart.version);
    } catch (error) {
      console.error(`Failed to add product to cart: ${error}`);
    }
  };

  return { addItemToCart };
};

export const getAnonymousToken = async (): Promise<string> => {
  console.log('Используем scope:', import.meta.env.VITE_CTP_SCOPES);
  const response = await fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/anonymous/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authHeader}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope:
          'manage_orders:justcodeit1313 create_anonymous_token:justcodeit1313',
      }),
    },
  );

  const data = await response.json();
  return data.access_token;
};

export const checkLoginUser = () => {
  if (localStorage.getItem('ctpTokenCache')) {
    return true;
  }
  return false;
};

export const checkAnonymousCart = () => {
  if (localStorage.getItem('anonymousCart')) {
    return true;
  }
  return false;
};

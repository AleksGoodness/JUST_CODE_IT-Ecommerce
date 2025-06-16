import { LineItemModified } from './clearCartObject';
import clearCartObject from './clearCartObject';

export const addToCartApi = async (
  cartId: string,
  item: LineItemModified,
  version: number,
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/carts/${cartId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version: version,
          actions: [
            {
              action: 'addLineItem',
              productId: item.id,
              variantId: 1,
              quantity: 1,
            },
          ],
        }),
      },
    );
    const cart = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return clearCartObject(cart);
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
};

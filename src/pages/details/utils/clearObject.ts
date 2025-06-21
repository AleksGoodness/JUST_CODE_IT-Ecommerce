import {
  IProductResponse,
  ProductDetails,
} from '@/interfaces/productDetails.interface';

import { formatPrice } from './formatPrice';

const clearObject = (tempObject: IProductResponse): ProductDetails => {
  const priceProperty =
    tempObject.masterData.staged.masterVariant.prices[0].value.centAmount;
  const currencyProperty =
    tempObject.masterData.staged.masterVariant.prices[0].value.currencyCode;
  const discountProperty =
    tempObject.masterData.staged.masterVariant.prices[0].discounted?.value
      .centAmount;
  const formatedPrice = formatPrice(currencyProperty, priceProperty);
  let formatedDiscount = '';
  if (typeof discountProperty === 'number') {
    formatedDiscount = formatPrice(currencyProperty, discountProperty);
  }

  return {
    id: tempObject.id,
    name: tempObject.masterData.current.name['en-US'],
    description: tempObject.masterData.staged.description,
    attributes: tempObject.masterData.staged.masterVariant.attributes,
    images: tempObject.masterData.staged.masterVariant.images,
    price: formatedPrice,
    discountPrice: formatedDiscount,
    cost: priceProperty,
    discount: discountProperty,
    sku: tempObject.masterData.staged.masterVariant.sku,
    currency: currencyProperty,
  };
};

export default clearObject;

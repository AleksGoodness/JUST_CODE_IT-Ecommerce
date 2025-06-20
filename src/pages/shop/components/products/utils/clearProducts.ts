import {
  ICLearProduct,
  IProduct,
} from '../../../../../services/interfaces/products.interfaces';

const clearProduct = (product: IProduct): ICLearProduct => {
  return {
    id: product.id,
    description: product.description['en-US'],
    name: product.name['en-US'],
    price: product.masterVariant.prices[0].value.centAmount,
    currency: product.masterVariant.attributes[0].value[0].currencyCode,
    images: product.masterVariant.images.map(img => ({
      url: img.url,
      label: product.name['en-US'],
    })),
    discount: product.masterVariant.prices[0].discounted?.value.centAmount,
  };
};

export default clearProduct;

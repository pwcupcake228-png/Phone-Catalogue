import type { Product } from '../types/Product';

export type DisplayPrice = {
  currentPrice: number;
  oldPrice?: number;
};

export const getDisplayPrice = (
  product: Product,
  showDiscount = true,
): DisplayPrice => {
  const isDiscounted =
    showDiscount &&
    product.priceDiscount > 0 &&
    product.priceRegular > product.priceDiscount;

  return {
    currentPrice: isDiscounted ? product.priceDiscount : product.priceRegular,
    oldPrice: isDiscounted ? product.priceRegular : undefined,
  };
};

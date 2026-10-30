import { useAppState } from '../store/store';

export const useProductInfo = (productId: string) => {
  const isLiked = useAppState(state => state.favourites.has(productId));
  const isFavourite = useAppState(state => state.cart.has(productId));

  return { isLiked, isFavourite };
};

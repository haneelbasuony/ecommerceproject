import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function addToWishList(productId) {
  let token = localStorage.getItem('token');

  return axios.post(
    'https://ecommerce.routemisr.com/api/v1/wishlist',
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

export function deleteFromWishList(productId) {
  let token = localStorage.getItem('token');
  return axios.delete(
    `
    https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

    {
      headers: {
        token,
      },
    }
  );
}

export default function useMutationWishList(fn) {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });
}

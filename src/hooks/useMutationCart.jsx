import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

export function addToCart(productId) {
  let token = localStorage.getItem('token');

  return axios.post(
    'https://ecommerce.routemisr.com/api/v1/cart',
    { productId },
    {
      headers: {
        token,
      },
    }
  );
}

export function deletItem(productId) {
  let token = localStorage.getItem('token');

  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers: {
        token,
      },
    }
  );
}

export function clearCart() {
  let token = localStorage.getItem('token');

  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token,
    },
  });
}

export function updateCount({ productId, count }) {
  let token = localStorage.getItem('token');

  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { count },
    {
      headers: {
        token,
      },
    }
  );
}

export default function useMutationCart(fn) {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

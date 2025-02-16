import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetWishList() {
  let token = localStorage.getItem('token');

  function getWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token,
      },
    });
  }
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    select: (data) => data?.data?.data,
  });
}

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function useAllOrders() {
  const token = localStorage.getItem('token');
  let id = null;

  if (token) {
    try {
      id = jwtDecode(token)?.id;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  async function getAllOrders() {
    if (!id) throw new Error('User ID not found');
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    return response.data;
  }

  return useQuery({
    queryKey: ['allorders'],
    queryFn: getAllOrders,
    // select: (data) => data?.data,
    enabled: !!id, // Only run query if ID exists
  });
}

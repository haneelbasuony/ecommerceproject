import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useSubCategorie(id) {
  function getSubCat() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }

  return useQuery({
    queryKey: ['subcat', id], // Ensure the query is cached per `id`
    queryFn: getSubCat,
    select: (data) => data?.data?.data,
    enabled: !!id, // Prevents query from running if `id` is undefined
  });
}

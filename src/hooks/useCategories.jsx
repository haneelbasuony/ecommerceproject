import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

export default function useCategories() {
  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data?.data?.data,
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchInterval: 5000,
    // staleTime: 30000,
  });
}

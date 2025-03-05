import axios from 'axios';

export function paymentOnline({ cartId, shippingAddress }) {
  let token = localStorage.getItem('token');

  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://ecommerceproject-ten.vercel.app/`,
    { shippingAddress },
    { headers: { token } }
  );
}

import { jwtDecode } from 'jwt-decode';
import React from 'react';
import useAllOrders from '../../hooks/useAllOrders';
import Loading from '../Loading/Loading';

export default function Orders() {
  let { data: orders, isLoading } = useAllOrders();
  if (isLoading) return <Loading></Loading>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-3xl text-green-600 mb-4">All Orders:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders?.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 w-full max-w-md transition-shadow duration-300 hover:shadow-lg hover:shadow-green-500">
      <h2 className="text-lg font-semibold text-gray-800">
        Order ID: {order._id}
      </h2>
      <p className="text-sm text-gray-600">Total: ${order.totalOrderPrice}</p>
      <p className="text-sm text-gray-600">
        Payment Method: {order.paymentMethodType}
      </p>
      <p className="text-sm text-gray-600">
        Paid: {order.isPaid ? 'Yes' : 'No'}
      </p>
      <p className="text-sm text-gray-600">
        Delivered: {order.isDelivered ? 'Yes' : 'No'}
      </p>
      <h3 className="mt-3 text-md font-semibold text-gray-800">
        Shipping Info
      </h3>
      <p className="text-sm text-gray-600">
        City: {order.shippingAddress.city}
      </p>
      <p className="text-sm text-gray-600">
        Phone: {order.shippingAddress.phone}
      </p>
      <h3 className="mt-3 text-md font-semibold text-gray-800">Items:</h3>
      <ul className="mt-2 space-y-2">
        {order.cartItems.map((item) => (
          <li
            key={item._id}
            className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg"
          >
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">
                {item.product.title}
              </p>
              <p className="text-xs text-gray-600">Price: ${item.price}</p>
              <p className="text-xs text-gray-600">Quantity: {item.count}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

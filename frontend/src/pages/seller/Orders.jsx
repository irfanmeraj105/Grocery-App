import { useContext, useEffect, useState } from "react";
import { assets, dummyOrders } from "../../assets/assets";

const Orders = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call with dummy data
      // In production, replace with actual API call:
      // const response = await fetch('/api/seller/orders');
      // const data = await response.json();
      
      // Using dummy data for demonstration
      setTimeout(() => {
        setOrders(dummyOrders);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      setLoading(false);
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        <div className="text-center py-8">
          <img
            src={assets.box_icon}
            alt="No orders"
            className="w-16 h-16 mx-auto mb-4 opacity-50"
          />
          <p className="text-gray-500">No orders found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={order.items?.[0]?.product?.image?.[0] || assets.box_icon}
                alt={order.items?.[0]?.product?.name || "Product"}
              />
              <div className="flex flex-col">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex flex-col justify-center">
                    <p className="font-medium text-sm">
                      {item.product?.name || "Product"}
                      {item.quantity > 1 && (
                        <span className="text-indigo-500 ml-1">
                          x {item.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm">
              <p className="font-medium mb-1">
                {order.address?.firstName || "Customer"} {order.address?.lastName || ""}
              </p>
              <p className="text-gray-600">
                {order.address?.street || "Street"}, {order.address?.city || "City"},{" "}
                {order.address?.state || "State"}, {order.address?.zipcode || "ZIP"}
              </p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">
              ${order.amount || 0}
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType || "N/A"}</p>
              <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
              <p>Status: {order.status || "Pending"}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;

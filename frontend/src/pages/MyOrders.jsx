import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      setError(null);
      setLoading(true);

      // Simulate API call with dummy data
      setTimeout(() => {
        setMyOrders(dummyOrders);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to load your orders. Please try again.");
      setLoading(false);
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setTimeout(() => {
        setMyOrders(dummyOrders);
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  // ✅ helper: safely parse price
  const parsePrice = (val) => {
    if (typeof val === "string") {
      return Number(val.replace(/[^0-9.]/g, "")) || 0;
    }
    return Number(val || 0);
  };

  // ✅ helper: format price in USD
  const formatPrice = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);

  if (loading) {
    return (
      <div className="mt-12 pb-16">
        <div>
          <p className="text-2xl md:text-3xl font-medium">My Orders</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 pb-16">
        <div>
          <p className="text-2xl md:text-3xl font-medium">My Orders</p>
        </div>
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

  if (myOrders.length === 0) {
    return (
      <div className="mt-12 pb-16">
        <div>
          <p className="text-2xl md:text-3xl font-medium">My Orders</p>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 pb-16">
      <div>
        <p className="text-2xl md:text-3xl font-medium">My Orders</p>
      </div>

      <div className="space-y-6">
        {myOrders.map((order) => {
          // ✅ calculate order subtotal from items
          const subtotal = (order.items || []).reduce((sum, item) => {
            const qty = Number(item.quantity ?? 1);
            const unitPrice = parsePrice(item.product?.offerPrice ?? 0);
            return sum + unitPrice * qty;
          }, 0);

          return (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg p-4 py-5 max-w-4xl"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium text-sm">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium">{order.paymentType || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-medium text-lg">
                    {formatPrice(subtotal)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Order Placed"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>
              </div>

              {order.items?.map((item, index) => {
                const qty = Number(item.quantity ?? 1);
                const unitPrice = parsePrice(item.product?.offerPrice ?? 0);
                const lineTotal = unitPrice * qty;

                return (
                  <div
                    key={index}
                    className={`relative bg-white text-gray-800/70 ${
                      order.items.length !== index + 1 && "border-b"
                    } border-gray-200 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full`}
                  >
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="p-2 rounded-lg bg-gray-50">
                        <img
                          src={item.product?.image?.[0] || "/placeholder.jpg"}
                          alt={item.product?.name || "Product"}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>

                      <div className="ml-4">
                        <h2 className="text-lg font-medium">
                          {item.product?.name || "Product"}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {item.product?.category || "Category"}
                        </p>
                      </div>
                    </div>

                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-medium">{qty}</p>
                    </div>

                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-600">Unit Price</p>
                      <p className="font-medium">{formatPrice(unitPrice)}</p>
                    </div>

                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-600">Line Total</p>
                      <p className="font-medium">{formatPrice(lineTotal)}</p>
                    </div>

                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="text-sm">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;

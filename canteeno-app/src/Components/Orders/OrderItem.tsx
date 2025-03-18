import { useEffect, useState } from "react";
import { Button } from "../Common/Button";
import axiosInstance from "../../Utils/axiosConfig";

export type OrderItemType = {
  orderItemId: number;
  itemId: number;
  itemName: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  orderId: number;
  orderNo: string;
  userId: number;
  amount: number;
  qrCodeUrl: string;
  orderStatus: "PENDING" | "COMPLETED" | "CANCELLED"; // Add more statuses if required
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItemType[];
};

export const OrderItem = () => {
  const [expandedOrder, setExpandedOrder] = useState(0);
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  const toggleOrderItems = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? 0 : orderId);
  };

  const getOrderItems = () => {
    axiosInstance.get("http://localhost:8080/api/order/pending").then((res) => {
      if (res.status === 200) {
        setOrderList(res.data);
      }
    });
  };

  useEffect(() => {
    getOrderItems();
  }, []);

  return (
    <div className="order-item-container">
      <div className="admin-content-display-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <>
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
                  <td
                    className="hover-order"
                    onClick={() => toggleOrderItems(order.orderId)}
                    style={{ cursor: "pointer" }}
                  >
                    {order.orderId}
                  </td>
                  <td>{order.createdAt}</td>
                  <td>{order.amount}</td>
                  <td>
                    <Button value="COMPLETED" />
                  </td>
                </tr>
                {expandedOrder === order.orderId && (
                  <tr className="order-details-row">
                    <td colSpan={2}></td>
                    <td colSpan={2}>
                      <tr key={index}>
                        {order.orderItems.map((orderItem, index) => (
                          <td key={index}>
                            {orderItem.itemName} - {orderItem.quantity} Qty
                          </td>
                        ))}
                      </tr>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

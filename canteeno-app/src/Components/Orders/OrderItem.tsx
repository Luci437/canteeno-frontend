import { useState } from "react";
import { Button } from "../Common/Button";
import { OrderListedItems } from "./OrderListedItems";

const sampleOrders = [
  {
    id: 1,
    orderName: "Order 1",
    orderDate: "12/12/2021",
    status: "Delivered",
    items: ["Pizza", "Burger", "Pasta"],
  },
  {
    id: 2,
    orderName: "Order 2",
    orderDate: "15/01/2022",
    status: "Pending",
    items: ["Sushi", "Ramen"],
  },
];

export const OrderItem = () => {
  const [expandedOrder, setExpandedOrder] = useState(0);

  const toggleOrderItems = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? 0 : orderId);
  };

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
            {sampleOrders.map((order) => (
              <>
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td
                    className="hover-order"
                    onClick={() => toggleOrderItems(order.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {order.orderName}
                  </td>
                  <td>{order.orderDate}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button value="Delete" />
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr className="order-details-row">
                    <td colSpan={2}></td>
                    <td colSpan={2}>
                      <tr>
                        <td>🍕 Pizza - 2 Qty</td>
                        <td>🍔 Burger - 1 Qty</td>
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

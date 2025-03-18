import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { persistor, RootState } from "../../Common/Slices/Store";
import axiosInstance from "../../Utils/axiosConfig";
import { OrderItemType, OrderType } from "../Orders/OrderItem";

export const UserProfile = () => {
  const userData = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState<OrderType>();
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  const getOrderList = () => {
    // API call to fetch orders
    axiosInstance
      .get(`http://localhost:8080/api/order/user/${userData.userId}`)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setOrderList(response.data);
        }
      });
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Logout":
        sessionStorage.removeItem("userToken");
        persistor.purge();
        navigate("/login");
        return;
      case "orders":
        return (
          <div className="order-list">
            {orderList.map((order) => (
              <button
                key={order.orderId}
                onClick={() => setSelectedOrder(order)}
                className="order-button"
              >
                <div className="order-id">Order #: {order.orderId}</div>
                <div className="order-details">
                  <span>{order.orderItems.length} items</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="order-amount">
                    ${order.amount.toFixed(2)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="header-container">
        <NavLink to="/">
          <FontAwesomeIcon icon={faLeftLong} className="back-button" />
        </NavLink>
      </div>
      <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
      <div className="user-info-container">
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
      </div>
      <div className="tabs">
        {["profile", "orders", "Logout"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="content">{renderContent()}</div>

      {selectedOrder && (
        <div className="popup">
          <div className="popup-content">
            <QRCodeCanvas value={selectedOrder.orderId.toString()} size={150} />
            <div>
              <h3>Items Booked:</h3>
              <ul>
                {/* {selectedOrder.orderItems.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))} */}
                {selectedOrder.orderItems.map((item: OrderItemType) => (
                  <li key={item.orderItemId}>
                    {item.itemName} x{item.quantity}
                  </li>
                ))}
              </ul>
              <button
                className="close-btn"
                onClick={() => setSelectedOrder(undefined)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

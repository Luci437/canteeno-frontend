import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";

const orders = [
  { id: "ORD123", items: ["Pizza", "Burger", "Pasta"] },
  { id: "ORD456", items: ["Sushi", "Ramen"] },
  { id: "ORD789", items: ["Salad", "Smoothie"] },
];

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <p>User Info: John Doe | johndoe@gmail.com</p>;

      case "orders":
        return (
          <div className="order-list">
            {orders.map((order) => (
              <button key={order.id} onClick={() => setSelectedOrder(order)}>
                Order ID: {order.id}
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
      <div className="tabs">
        {["profile", "orders"].map((tab) => (
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
            <QRCodeCanvas value={selectedOrder.id} size={150} />
            <div>
              <h3>Items Booked:</h3>
              <ul>
                {selectedOrder.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <button
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
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

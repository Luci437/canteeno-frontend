import { NavLink } from "react-router";
import { CartItem } from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export const CartHome = () => {
  return (
    <>
      <div className="header-container">
        <NavLink to="/">
          <FontAwesomeIcon icon={faLeftLong} className="back-button" />
        </NavLink>
      </div>
      <div className="cart-home-container">
        <h2 className="cart-title-name">Food Cart</h2>
        <div className="cart-item-list">
          <CartItem />
          <CartItem />
        </div>
      </div>
      <div className="cart-total-container">
        <div className="cart-total-divider">
          <p className="cart-total-text">Total</p>
          <p className="cart-total-price">₹ 300</p>
        </div>
        <button className="cart-total-button">Place Order</button>
      </div>
    </>
  );
};

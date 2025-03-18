import { NavLink, useNavigate } from "react-router";
import { CartItem } from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { persistor, RootState } from "../../../Common/Slices/Store";
import { useEffect } from "react";
import axiosInstance from "../../../Utils/axiosConfig";

export const CartHome = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    if (cartData?.cartItems.length === 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  const handlePlaceOrder = () => {
    axiosInstance
      .post(`http://localhost:8080/api/cart/${cartData?.userId}/checkout`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          persistor.purge();
          navigate("/order-success");
        }
      });
  };

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
          {cartData?.cartItems.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
      <div className="cart-total-container">
        <div className="cart-total-divider">
          <p className="cart-total-text">Total</p>
          <p className="cart-total-price">₹ {cartData?.totalPrice}</p>
        </div>
        <button className="cart-total-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </>
  );
};

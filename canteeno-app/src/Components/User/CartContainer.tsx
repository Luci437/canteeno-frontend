/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Common/Slices/Store";
import axiosInstance from "../../Utils/axiosConfig";
import { setCart } from "../../Common/Slices/CartSlice";
import { useDispatch } from "react-redux";

export type CartItemType = {
  cartItemId: number;
  itemId: number;
  itemName: string;
  quantity: number;
  price: number;
  createdAt: string; // Consider using `Date` for better date handling
  updatedAt: string; // Consider using `Date` for better date handling
};

export type CartType = {
  cartId: number;
  userId: number;
  totalPrice: number;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "COMPLETED"; // Add relevant status options
  cartItems: CartItemType[];
  createdBy: string;
  createdAt: string; // Consider using `Date`
  updatedBy: string;
  updatedAt: string; // Consider using `Date`
};

type CartContainerProps = {
  className?: string;
  qty?: number;
  itemid?: number;
};

export const CartContainer = ({
  className,
  qty,
  itemid,
}: CartContainerProps) => {
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart?.cartItems || []
  );
  const cartItemData = useSelector((state: RootState) => state.cart);
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(qty || 0);

  useEffect(() => {
    if (itemid) {
      const item = cartItems.find((item) => item.itemId === itemid);

      if (item) {
        setQuantity(item.quantity);
      }
      if (cartItemData.cart?.cartItems.length === 0) {
        setQuantity(0);
      }
    }
  }, [cartItems, itemid]);

  const updateCart = (itemQuantity: number) => {
    axiosInstance
      .post(`http://localhost:8080/api/cart/${userData.userId}/add`, {
        itemId: itemid,
        quantity: itemQuantity,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCart(res.data));
          if (res.data.cartItems.length === 0) {
            setQuantity(0);
          }
        }
      });
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    updateCart(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      updateCart(quantity - 1);
    }
  };

  if (quantity === 0) {
    return (
      <div className={`cart-container ${className}`}>
        <button className="cart-first-button" onClick={handleIncrement}>
          ADD
        </button>
      </div>
    );
  }
  return (
    <div className={`cart-container is-selected ${className}`}>
      <button onClick={handleDecrement}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

import { useState } from "react";

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
  const [quantity, setQuantity] = useState(qty || 0);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
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

import { CartContainer, CartItemType } from "../CartContainer";
import { FoodType } from "../FoodType";

type CartItemProps = {
  item: CartItemType;
};

export const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="cart-item-container">
      <div className="cart-item-name">
        <p>{item.itemName}</p>
        <FoodType foodType="veg" />
      </div>
      <div className="cart-item-quantity">
        <CartContainer
          className="cart-container-cart"
          qty={item.quantity}
          itemid={item.itemId}
        />
        <p className="cart-item-price">₹ {item.price}</p>
      </div>
    </div>
  );
};

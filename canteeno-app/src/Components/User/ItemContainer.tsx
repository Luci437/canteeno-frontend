import { CartContainer } from "./CartContainer";
import defaultImg from "../../Assets/Images/burger.jpg";
import { FoodType } from "./FoodType";
import { GroupedItem } from "./Home";
import { useEffect, useState } from "react";

type ItemContainerProps = {
  item: GroupedItem;
};

export const ItemContainer = ({ item }: ItemContainerProps) => {
  const [itemStock, setItemStock] = useState<number | null>(null);

  useEffect(() => {
    if (item.itemStock) {
      setItemStock(item.itemStock.availableQuantity);
      if (item.itemStock.availableQuantity === 0) {
        setItemStock(null);
      }
    } else {
      setItemStock(null);
    }
  }, [item.itemStock]);

  return (
    <div
      className={`dish-container ${
        itemStock === null ? "disabled-container" : ""
      }`}
    >
      <div className="dish-container-sub">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <FoodType foodType="veg" />
        <div className="price">
          <span className="currency">₹</span>
          {item.price}
        </div>
      </div>
      <div className="dish-container-sub">
        <img
          loading="lazy"
          src={item.imageUrls[0] ?? defaultImg}
          alt="default-img"
        />
        <CartContainer itemid={item.itemId} className={"cart-container-home"} />
      </div>
    </div>
  );
};

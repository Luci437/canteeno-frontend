import { CartContainer } from "./CartContainer";
import defaultImg from "../../Assets/Images/burger.jpg";
import { FoodType } from "./FoodType";
import { GroupedItem } from "./Home";

type ItemContainerProps = {
  item: GroupedItem;
};

export const ItemContainer = ({ item }: ItemContainerProps) => {
  console.log("item?.itemStock", item?.itemStock);
  return (
    <div
      className={`dish-container ${
        item?.itemStock === null ? "disabled-container" : ""
      }`}
    >
      <div className="dish-container-sub">
        <h3 className="item-name">{item.name}</h3>
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

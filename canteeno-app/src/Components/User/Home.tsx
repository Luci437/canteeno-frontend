import { NavLink } from "react-router";
import "../../Assets/Css/Home.scss";
import { CartButton } from "./CartButton";
import { ItemContainer } from "./ItemContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  return (
    <div className="home-container">
      <span className="home-container-span">
        <h1 className="site-title-name">Canteeno</h1>
        <NavLink to={"/user"} className="site-profie">
          <FontAwesomeIcon icon={faUser} /> Appu
        </NavLink>
      </span>
      <div className="image-slider-container"></div>
      <div className="menu-container">
        <h2 className="menu-title-name">Breakfast</h2>
        <ItemContainer />
        <ItemContainer />

        <h2 className="menu-title-name">Lunch</h2>
        <ItemContainer />
        <ItemContainer />
        <ItemContainer />
      </div>
      <CartButton />
    </div>
  );
};

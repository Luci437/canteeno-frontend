import { NavLink, useLocation } from "react-router";

export const NavMenus = () => {
  const location = useLocation();

  const getActiveClass = (path: string) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <div className="admin-nav-menu-list">
      <NavLink to="/admin/orders" className={getActiveClass("/admin/orders")}>
        Orders
      </NavLink>
      <NavLink
        to="/admin/addItems"
        className={getActiveClass("/admin/addItems")}
      >
        Items
      </NavLink>
      <NavLink
        to="/admin/addStock"
        className={getActiveClass("/admin/addStock")}
      >
        Stock
      </NavLink>
      <NavLink
        to="/admin/addCategories"
        className={getActiveClass("/admin/addCategories")}
      >
        Categories
      </NavLink>
      <NavLink
        to="/admin/addStore"
        className={getActiveClass("/admin/addStore")}
      >
        Store
      </NavLink>
    </div>
  );
};

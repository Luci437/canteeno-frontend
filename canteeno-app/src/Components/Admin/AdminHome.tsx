import { Route, Routes, useNavigate } from "react-router";
import { AddItems } from "../Items/AddItems";
import { AddCategories } from "../Items/AddCategories";
import { AddStore } from "../Store/AddStore";
import { NavMenus } from "./NavMenus";
import { useEffect } from "react";
import { OrderHome } from "../Orders/OrderHome";
import { StockHome } from "../Stock/StockHome";

export const AdminHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/orders");
  }, []);
  return (
    <div>
      <div className="admin-top-section">
        <h2>Canteeno Archon</h2>
      </div>
      <div className="admin-main-section">
        <div className="admin-nav-section">
          <NavMenus />
        </div>
        <div className="admin-content-section">
          <Routes>
            <Route path="/orders" element={<OrderHome />} />
            <Route path="/addItems" element={<AddItems />} />
            <Route path="/addCategories" element={<AddCategories />} />
            <Route path="/addStore" element={<AddStore />} />
            <Route path="/addStock" element={<StockHome />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

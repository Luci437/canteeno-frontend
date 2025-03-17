import { Route, Routes } from "react-router";
import "./App.css";
import { UserAuth } from "./Components/Auth/UserAuth";
import { UseDeviceType } from "./Utils/UseDeviceType";
import { AdminHome } from "./Components/Admin/AdminHome";
import { Home } from "./Components/User/Home";
import { CartHome } from "./Components/User/Cart/CartHome";
import { UserProfile } from "./Components/User/UserProfile";
import { OrderSuccess } from "./Components/User/Cart/OrderSuccess";

const App = () => {
  UseDeviceType();
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<UserAuth />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/signup" element={<UserAuth />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/cart" element={<CartHome />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;

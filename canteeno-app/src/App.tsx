import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import { UserAuth } from "./Components/Auth/UserAuth";
import { AdminHome } from "./Components/Admin/AdminHome";
import { Home } from "./Components/User/Home";
import { CartHome } from "./Components/User/Cart/CartHome";
import { UserProfile } from "./Components/User/UserProfile";
import { OrderSuccess } from "./Components/User/Cart/OrderSuccess";
import { useEffect, useState } from "react";
import { Loading } from "./Components/Common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "./Common/Slices/Store";
import { ErrorMessage } from "./Components/Common/ErrorMessage";

const App = () => {
  const navigate = useNavigate();
  const loader = useSelector((state: RootState) => state.loading.isLoading);
  const [showLoading, setShowLoading] = useState(loader);

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setShowLoading(loader);
  }, [loader]);

  return (
    <div className="App">
      {showLoading && <Loading />}
      <ErrorMessage />

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

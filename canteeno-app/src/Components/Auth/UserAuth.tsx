import { useState } from "react";
import { InputBox } from "../Common/Input";
import LoginImage from "../../Assets/Images/loginImage.png";
import "../../Assets/Css/Auth.scss";
import axiosInstance from "../../Utils/axiosConfig";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Common/Slices/UserSlice";

export type registerType = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  role?: string;
};

export const UserAuth = () => {
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState("login");
  const [registerData, setRegisterData] = useState<registerType>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleAuthChange = (mode: string) => setAuthMode(mode);

  // to save input values
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    let preVal = { ...registerData };
    preVal = { ...preVal, [name]: value };

    setRegisterData(preVal);
  };

  const handleLogin = () => {
    const loginData = {
      username: registerData?.email,
      password: registerData?.password,
    };
    if (!loginData.username || !loginData.password) {
      alert("Please fill in all required fields.");
      return;
    }
    axiosInstance
      .post("http://localhost:8080/api/auth/login", loginData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUserData(res.data));
          sessionStorage.setItem("userToken", JSON.stringify(res.data.token));
          if (res.data.role === "ADMIN") {
            navigate("/admin");
          } else navigate("/");
        }
        console.log(res);
      });
  };

  const handleRegister = () => {
    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.phoneNumber
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    let finalRegisterData = { ...registerData, role: "CUSTOMER" };
    axiosInstance
      .post("http://localhost:8080/api/auth/register", finalRegisterData)
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-register-container">
      <img src={LoginImage} alt="Login" />

      {authMode === "login" && (
        <div className="login-container">
          <div>
            <label htmlFor="email">Username</label>
            <InputBox
              type="text"
              id="email"
              name="email"
              required
              placeholder="email or Phone number"
              value={registerData?.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <InputBox
              type="password"
              id="password"
              name="password"
              required
              placeholder="password"
              value={registerData?.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}

      {authMode === "register" && (
        <div className="register-container">
          <div>
            <label htmlFor="name">Name</label>
            <InputBox
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              value={registerData?.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Username</label>
            <InputBox
              type="text"
              id="email"
              name="email"
              required
              placeholder="email"
              value={registerData?.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <InputBox
              type="password"
              id="password"
              name="password"
              required
              placeholder="password"
              value={registerData?.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <InputBox
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone number"
              required
              value={registerData?.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </div>
      )}
      <div className="auth-toggle">
        {authMode === "register" ? (
          <button
            className={authMode === "register" ? "active" : ""}
            onClick={() => handleAuthChange("login")}
          >
            Already a member? Login
          </button>
        ) : (
          <button
            className={authMode === "login" ? "active" : ""}
            onClick={() => handleAuthChange("register")}
          >
            Create new Account, Register Now
          </button>
        )}
      </div>
    </div>
  );
};

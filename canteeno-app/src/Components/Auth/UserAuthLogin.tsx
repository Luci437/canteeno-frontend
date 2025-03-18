import { useSelector } from "react-redux";
import { RootState } from "../../Common/Slices/Store";
import { InputBox } from "../Common/Input";

export const UserAuthLogin = () => {
  const { name, email, phoneNumber } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <div className="">
      <h2>Login</h2>
      <p>{name}</p>
      <p>{email}</p>
      <p>{phoneNumber}</p>
      <div>
        <label htmlFor="username">Username:</label>
        <InputBox
          type="text"
          id="username"
          name="username"
          required
          placeholder="email/phone"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <InputBox
          type="password"
          id="password"
          name="password"
          required
          placeholder="password"
        />
      </div>
      <button type="submit">Login</button>
    </div>
  );
};

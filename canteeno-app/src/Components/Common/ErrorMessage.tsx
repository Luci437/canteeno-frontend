import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Common/Slices/Store";

export const ErrorMessage = () => {
  const [visible, setVisible] = useState(false);
  const errorMessage = useSelector((state: RootState) => state.errorMessage);
  const [message, setMessage] = useState(errorMessage.message);

  useEffect(() => {
    if (errorMessage.message) {
      setVisible(true);
      setMessage(errorMessage.message);
    }
  }, [errorMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return <>{visible ? <div className="toast">{message}</div> : <> </>}</>;
};

import { useState } from "react";
import userAuthContext from "./userAuthContext";

const UserAuthState = (props) => {
  // const host = "https://hey-sainty-backend.vercel.app";
  const host = "http://localhost:5002";

  const [user, setUser] = useState(null);
  const [userById, setUserById] = useState(null);

  const [otpSent, setOtpSent] = useState(null);

  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const url = `${host}/user-auth/userdata`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userToken: localStorage.getItem("userToken"),
        },
      });
      const data = await response.json();

      if (data.success !== true) {
        setError(data.message);
      } else {
        const user = data.user;
        setUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserDetailsById = async (userId) => {
    try {
      const url = `${host}/user-auth/userdatabyid/${userId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        const user = data.user;
        setUserById(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await fetch(`${host}/user-auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const user = data.user;
        localStorage.setItem("userToken", data.token);
        setUser(user);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${host}/user-auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const user = data.user;
        setUser(user);
        localStorage.setItem("userToken", data.token);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendOtp = async (email) => {
    try {
      const response = await fetch(`${host}/user-auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(data.otp);
      } else {
        setError(data.message);
      }
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <userAuthContext.Provider
      value={{
        error,
        user,
        fetchUserDetails,
        userById,
        fetchUserDetailsById,
        signin,
        signup,
        otpSent,
        sendOtp
      }}
    >
      {props.children}
    </userAuthContext.Provider>
  );
};

export default UserAuthState;

import { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [resetOtp, setResetOtp] = useState("");

  // const host = "http://localhost:5002";
  const host = "https://hey-sainty-backend.vercel.app";

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

      if (!data.success) {
        return data.message;
      }
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const editProfile = async (name, profilePicture) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("profilePicture", profilePicture);

      const response = await fetch(`${host}/user/edit-profile`, {
        method: "PUT",
        headers: {
          userToken: localStorage.getItem("userToken"),
        },
        body: formData,
      });
      const data = await response.json();

      setUser(data.updatedUser);
      return data.message;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${host}/user/change-password`, {
        method: "PUT",
        headers: {
          userToken: localStorage.getItem("userToken"),
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        return data.message;
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const sendOtpForPasswordReset = async () => {
    try {
      const response = await fetch(`${host}/user/send-otp-for-password-recover`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userToken: localStorage.getItem("userToken"),
        },
      });

      const data = await response.json();

      if (!data.success) {
        return data.message;
      }
      setResetOtp(data.otp);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const resetPassword = async (password) => {
    try {
      const response = await fetch(`${host}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!data.success) {
        return data.message;
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  const updateNotificationSettings = async (emailNewsletter, emailSecurityAlert) => {
    try {
      const response = await  fetch(`${host}/user/update-notification-setting`, {
        method : 'PUT',
        headers : {
          'content-type' : 'application/json',
          userToken : localStorage.getItem('userToken')
        },
        body : JSON.stringify({emailNewsletter, emailSecurityAlert})
      });

      const data = await response.json();

      if( !data.success ){
        return data.message;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <userContext.Provider
      value={{
        fetchUserDetails,
        user,
        editProfile,
        changePassword,
        sendOtpForPasswordReset,
        resetOtp,
        resetPassword,
        updateNotificationSettings
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;

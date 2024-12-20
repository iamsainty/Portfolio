import { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
  const [user, setUser] = useState(null);

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

      if (!data.success) {
        return data.message;
      }
      setUser(data.updatedUser);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  };

  return (
    <userContext.Provider
      value={{
        fetchUserDetails,
        user,
        editProfile,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;

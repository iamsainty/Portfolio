"use client";

const { createContext, useContext, useState, useEffect } = require("react");

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const googleAuth = async (name, email, googleId, profilePicture) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth/googleoauth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, googleId, profilePicture }),
        }
      );

      const data = await response.json();

      if (data.message) {
        setError(data.message);
        return;
      }

      const userToken = data.userToken;

      console.log(userToken);

      document.cookie = `userToken=${userToken}`;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signInEmailPass = async (email, password) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth/emailpasssignin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const userToken = data.userToken;
        document.cookie = `userToken=${userToken}`;
      }

      return data.message;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUpEmailPass = async (name, email, password, otp) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth/emailpasssignup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, otp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const userToken = data.userToken;
        document.cookie = `userToken=${userToken}`;
      }

      return data.message;
    } catch (error) {
      console.error("Signup Error:", error);
      return "Network error";
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      const userToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];

      if (!userToken) {
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getuserdata`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userToken: userToken,
          },
        }
      );

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserInfo = async (userId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getuserdata/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkAccount = async (email) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth/checkaccount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("CheckAccount Error:", error);
      return "Something went wrong";
    } finally {
      setLoading(false);
    }
  };

  const sendSignUpOtp = async (name, email) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth/sendsignupotp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await response.json();

      return data.message;
    } catch (error) {
      console.error("SendSignUpOtp Error:", error);
      return "Something went wrong";
    } finally {
      setLoading(false);
    }
  };

  const editname = async (name) => {
    try {
      const userToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];

      if (!userToken) {
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/edit-profile/edit-name`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userToken: userToken,
          },
          body: JSON.stringify({ name }),
        }
      );
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("EditName Error:", error);
      return "Something went wrong";
    }
  };

  const editProfilePicture = async (newPictureUrl) => {
    try {
      const userToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];

      if (!userToken) {
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/edit-profile/edit-profilepicture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userToken: userToken,
          },
          body: JSON.stringify({ newPictureUrl }),
        }
      );
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("EditProfilePicture Error:", error);
      return "Something went wrong";
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        googleAuth,
        loading,
        error,
        user,
        signInEmailPass,
        signUpEmailPass,
        userInfo,
        getUserInfo,
        checkAccount,
        sendSignUpOtp,
        editname,
        editProfilePicture
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);

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

      console.log(data);

      if (data.message) {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }

      const userToken = data.userToken;

      document.cookie = `userToken=${userToken}`;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUpEmailPass = async (name, email, password) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/auth/emailpasssignup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.message) {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }

      const userToken = data.userToken;

      document.cookie = `userToken=${userToken}`;
    } catch (error) {
      console.error(error);
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
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);

"use client";

const { createContext, useContext, useState } = require("react");

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

      const userToken = data.userToken;

      document.cookie = `userToken=${userToken}`;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserAuthContext.Provider value={{ googleAuth, loading, user }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);

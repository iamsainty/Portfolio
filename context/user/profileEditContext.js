"use client";

const { createContext, useContext } = require("react");

const UserEditProfileContext = createContext();

export const UserEditProfileProvider = ({ children }) => {
  const editNotificationPreferences = async (
    newBlogEmail,
    accountUpdateEmail
  ) => {
    try {
      const userToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];

      if (!userToken) {
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/edit-profile/edit-preferences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userToken: userToken,
          },
          body: JSON.stringify({ newBlogEmail, accountUpdateEmail }),
        }
      );

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error(error);
      return "Error updating preferences";
    }
  };
  return (
    <UserEditProfileContext.Provider value={{ editNotificationPreferences }}>
      {children}
    </UserEditProfileContext.Provider>
  );
};

export const useUserEditProfile = () => useContext(UserEditProfileContext);

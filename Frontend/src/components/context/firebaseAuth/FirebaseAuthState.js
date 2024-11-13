import { useState } from "react";
import firebaseAuthContext from "./firebaseAuthContext";

const FirebaseAuthState = (props) => {
  const host = "http://localhost:5002";
  //  const host = 'https://hey-sainty-backend.vercel.app';

  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const url = `${host}/firebaseauth/userdata`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userToken: localStorage.getItem("userToken"),
        },
      });
      const data = await response.json();

      if (data.tokenValid) {
        const user = data.user;
        setUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signin = async (email) => {
    try {
      const response = await fetch(`${host}/firebaseauth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if(data.success){
        localStorage.setItem( "userToken", data.token);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (name, email, emailVerified, uid, profilePictureUrl) => {
    try {
      const response = await fetch(`${host}/firebaseauth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, emailVerified, uid, profilePictureUrl }),
      });
      const data = await response.json();
      if(data.success){
        localStorage.setItem( "userToken", data.token);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <firebaseAuthContext.Provider value={{ user, fetchUserDetails, signin, signup }}>
      {props.children}
    </firebaseAuthContext.Provider>
  );
};

export default FirebaseAuthState;

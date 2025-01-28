import React from "react";

import blogActivityContext from "./blogActivityContext";

const BlogActivityState = (props) => {
  // const host = "https://hey-sainty-backend.vercel.app";
  //   const host = "http://localhost:5002";


  return (
    <blogActivityContext.Provider value={{  }}>
      {props.children}
    </blogActivityContext.Provider>
  );
};

export default BlogActivityState;

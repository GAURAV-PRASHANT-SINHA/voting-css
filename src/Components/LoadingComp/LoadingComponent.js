import React from "react";
import ReactLoading from "react-loading";

const LoadingComponent = ({ color = "red", size = 64 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Center vertically with a full viewport height
      }}
    >
      <ReactLoading type="spin" color={color} height={size} width={size} />
    </div>
  );
};

export default LoadingComponent;

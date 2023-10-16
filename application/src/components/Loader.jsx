import React from "react";
import Container from "react-bootstrap/esm/Container";

export const VariableHeightLoader = (height) => {
  return (
    <Container
      style={{ height: { height }, display: "flex", alignContent: "center" }}
    >
      <svg
        className="loader"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#0A998F"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="#0A998F"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </Container>
  );
};

//default value if you don't want to add message
export const Loader = () => {
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <svg
        className="loader"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#0A998F"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="#0A998F"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p style={{ maxWidth: "350px" }}></p>
    </Container>
  );
};

export default Loader;

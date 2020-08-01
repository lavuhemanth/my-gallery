import React from "react";

const HandleSuccess = ({ message }) => {
  return (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
};

export default HandleSuccess;

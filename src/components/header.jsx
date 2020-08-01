import React from "react";
import camera from "../assets/icons/camera.png";
import { Link } from "react-router-dom";
import auth from "../auth";

// const logout = (props) => {
//   localStorage.removeItem("token");
//   props.history.push("/");
// };
const Header = (props) => {
  return (
    <nav className="navbar sticky-top navbar-light bg-light theme">
      <Link to="/" className="navbar-brand title title-color">
        <img
          className="mr-2"
          src={camera}
          height="30"
          width="30"
          alt="camera icon"
        />
        <span>My Gallery</span>
      </Link>
      <button
        className="btn btn-link title-color"
        onClick={() =>
          auth.logOut(() => {
            props.history.push("/");
          })
        }
      >
        Logout
      </button>
    </nav>
  );
};

export default Header;

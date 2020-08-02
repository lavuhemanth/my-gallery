import React, { Component } from "react";
import camera from "../assets/icons/camera.png";
import { Link } from "react-router-dom";
import auth from "../auth";
import { List } from "react-bootstrap-icons";

class Header extends Component {
  state = {
    isToggle: false,
    displayClass: "d-none",
  };

  handleToggle = () => {
    let { isToggle, displayClass } = this.state;
    isToggle = !isToggle;
    displayClass = !isToggle ? "d-none" : "d-block";
    this.setState({ isToggle, displayClass });
  };
  render() {
    return (
      <div className="sticky-top">
        <nav className="navbar navbar-light bg-light theme">
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
            className="navbar-toggler"
            type="button"
            onClick={this.handleToggle}
          >
            <List />
          </button>
        </nav>
        <div className={this.state.displayClass}>
          <div className="theme px-4 py-2">
            <ul className="list-group list-group-flush ">
              <li className="list-group-item theme py-1">Profile</li>
              <li
                className="list-group-item theme py-1"
                onClick={() =>
                  auth.logOut(() => {
                    this.props.history.push("/");
                  })
                }
              >
                <button className="btn btn-link title-color p-0">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

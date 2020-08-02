import React, { Component } from "react";
import InputField from "../common/inputField";
import Joi from "joi";
import { Link } from "react-router-dom";
import auth from "../auth";

class Login extends Component {
  username = React.createRef();

  state = {
    account: {
      email: "",
      password: "",
    },
    errors: {},
  };

  accountSchema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).max(15).required().label("Password"),
  };

  validate = () => {
    const option = {
      abortEarly: false,
    };

    const { error } = Joi.validate(
      this.state.account,
      this.accountSchema,
      option
    );
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.accountSchema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/home");
    }
  }

  componentDidUpdate() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/home");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.account),
    };
    fetch(`https://demo-my-gallery.herokuapp.com/api/login`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(" :: Login Success :: ");
        if (data.token) {
          localStorage.setItem("token", data.token);
          auth.login(() => {
            this.props.history.push("/home");
          });
        }
        // this.props.handleAuthUser();
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
      });
    console.log("submitted :: ", this.state.account);
  };

  handleInput = (e) => {
    const { account, errors } = this.state;

    errors[e.currentTarget.name] = this.validateProperty(e.currentTarget);

    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="theme-bg ">
        <div className="container">
          <div className="text-center m-4">
            <div className="mt-20p mb-50p title-color">
              <h1 className="m-0 title">MyGallery</h1>
              <span>catchphrase</span>
            </div>
            <form onSubmit={this.handleSubmit} className="mb-5">
              <InputField
                refs={this.username}
                value={account.email}
                type="email"
                name="email"
                placeholder="Email Id"
                onChange={this.handleInput}
                error={errors.email}
              />

              <InputField
                value={account.password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleInput}
                error={errors.password}
              />
              <button
                disabled={this.validate()}
                type="submit"
                className="btn btn-light w-100 theme-color"
              >
                Login
              </button>
            </form>
            <small className="title-color cursor">
              <i>lets do </i>
              <Link to="/signup">Signup</Link> <i>first ?</i>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

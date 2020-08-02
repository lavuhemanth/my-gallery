import React, { Component } from "react";
import InputField from "../common/inputField";
import Joi from "joi";
import { Link } from "react-router-dom";
import auth from "../auth";
import Spinner from "../common/spinner";

let timer = null;
class Login extends Component {
  username = React.createRef();

  state = {
    account: {
      email: "",
      password: "",
    },
    errors: {},
    isLoading: false,
    errorMessage: "",
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
    this.setState({ isLoading: true });
    // https://demo-my-gallery.herokuapp.com
    fetch(`https://demo-my-gallery.herokuapp.com/api/login`, requestOptions)
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        } else {
          const error = await response.json();

          throw new Error(error.error);
        }
      })
      .then((response) => {
        const data = response;
        this.setState({ isLoading: false });
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          auth.login(() => {
            this.props.history.push("/home");
          });
        }
        // this.props.handleAuthUser();
      })
      .catch((error) => {
        this.setState({ isLoading: false, errorMessage: error.toString() });
        this.showErrorMessage();
      });
    console.log("submitted :: ", this.state.account);
  };

  handleInput = (e) => {
    const { account, errors } = this.state;

    errors[e.currentTarget.name] = this.validateProperty(e.currentTarget);

    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };

  showErrorMessage = () => {
    timer = setTimeout(() => {
      this.setState({ errorMessage: "" });
    }, 3000);
  };

  componentWillUnmount() {
    clearTimeout(timer);
  }

  render() {
    const { account, errors, isLoading, errorMessage } = this.state;
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
          {errorMessage.length ? (
            <div className="alert alert-danger m-2" role="alert">
              {errorMessage}
            </div>
          ) : (
            <></>
          )}
        </div>
        {isLoading && <Spinner />}
      </div>
    );
  }
}

export default Login;

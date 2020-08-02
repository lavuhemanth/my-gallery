import React, { Component } from "react";
import InputField from "../common/inputField";
import Joi from "joi";
import { Link } from "react-router-dom";
import auth from "../auth";
import Spinner from "../common/spinner";

let timer = null;
class Register extends Component {
  genderMaleRef = React.createRef();
  genderFemaleRef = React.createRef();
  state = {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "Male",
      dob: "1997-03-05",
      age: 0,
    },
    errors: {},
    errorMessage: "",
    isLoading: false,
  };

  componentDidMount() {}

  userSchema = {
    firstName: Joi.string().min(3).max(255).required().label("First Name"),
    lastName: Joi.string().min(3).max(255).required().label("Last Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(8).max(15).required().label("Password"),
    dob: Joi.date().required().label("Date of Birth"),
    gender: Joi.string(),
    age: Joi.number(),
  };

  validate = () => {
    const option = {
      abortEarly: false,
    };

    const { error } = Joi.validate(this.state.user, this.userSchema, option);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.userSchema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  calculateAge = () => {
    const { dob } = this.state.user;
    const dob2 = new Date();

    const age = new Date(dob2).getFullYear() - new Date(dob).getFullYear();
    return age;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    const { user } = this.state;
    user.age = this.calculateAge();
    this.setState({ user, errors: errors || {} });
    console.log("submitted :: ", JSON.stringify(this.state.user));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.user),
    };
    this.setState({ ...this.state, isLoading: true });
    fetch(`https://demo-my-gallery.herokuapp.com/api/users`, requestOptions)
      .then(async (response) => {
        if (response.ok) {
          return await response.json();
        } else {
          const error = await response.json();

          throw new Error(error.error);
        }
      })
      .then(async (response) => {
        const data = await response.json();
        this.setState({ ...this.state, isLoading: false });
        if (data) {
          console.log("data :: ", data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          auth.login(() => {
            this.props.history.push("/home");
          });
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString(), isLoading: false });
      });
  };

  handleInput = (e) => {
    const { user, errors } = this.state;

    errors[e.currentTarget.name] = this.validateProperty(e.currentTarget);

    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ user, errors });
  };

  handleGender = (arg) => {
    const { user } = this.state;

    user.gender = arg;

    this.setState({ ...this.state, user });
  };

  handleDateInput = (e) => {
    const { user } = this.state;
    console.log("DatePicker ::", e.currentTarget.value);
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ user });
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
    const { user, errors, isLoading, errorMessage } = this.state;
    return (
      <>
        <div className="container">
          <div className="text-center mx-4 my-2">
            <form onSubmit={this.handleSubmit}>
              <p className="mx-0 mt-2 mb-3">
                <strong>What's your name?</strong>
              </p>
              <InputField
                value={user.firstName}
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={this.handleInput}
                error={errors.firstName}
              />
              <InputField
                value={user.lastName}
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={this.handleInput}
                error={errors.lastName}
              />

              <p className="mx-0 mt-2 mb-3">
                <strong>Provide us your login details?</strong>
              </p>
              <InputField
                value={user.email}
                type="email"
                name="email"
                placeholder="Email Id"
                onChange={this.handleInput}
                error={errors.email}
              />
              <InputField
                value={user.password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleInput}
                error={errors.password}
              />

              <p className="mx-0 mt-2 mb-2">
                <strong>And your gender?</strong>
              </p>

              <div className="row justify-content-between m-0 mb-2">
                <div className="form-control p-0 col-5 ">
                  <input
                    ref={this.genderMaleRef}
                    id="gender"
                    type="button"
                    name="gender"
                    className={
                      user.gender === "Male"
                        ? "gender-btn form-control  btn btn-light theme-color active"
                        : "gender-btn form-control  btn btn-light theme-color"
                    }
                    onClick={() => this.handleGender("Male")}
                    value="Male"
                  />
                </div>

                <div className="form-control p-0  col-5">
                  <input
                    id="gender"
                    type="button"
                    name="gender"
                    className={
                      user.gender === "Female"
                        ? "gender-btn form-control  btn btn-light theme-color active"
                        : "gender-btn form-control  btn btn-light theme-color"
                    }
                    onClick={() => this.handleGender("Female")}
                    value="Female"
                  />
                </div>
              </div>

              <div className="mx-0 mt-3 mb-3">
                <p className=" mb-0">
                  <strong>What's your date of birth?</strong>
                </p>
                <small>This can't be change later</small>
              </div>
              <InputField
                type="date"
                name="dob"
                placeholder="DD/MM/YYYY"
                onChange={this.handleDateInput}
                value={user.dob}
              />
              <button
                disabled={this.validate()}
                type="submit"
                className="btn  btn-outline-success w-100 theme mt-4"
              >
                Signup
              </button>
            </form>
            <small className="theme-color cursor">
              <i>Go Back to </i>
              <Link to="/login">Login ?</Link>
            </small>
          </div>
          {/* {isLoading && <Spinner />} */}
          {errorMessage.length ? (
            <div className="alert alert-danger m-2" role="alert">
              {errorMessage}
            </div>
          ) : (
            <></>
          )}
        </div>
        {isLoading && <Spinner />}
      </>
    );
  }
}

export default Register;

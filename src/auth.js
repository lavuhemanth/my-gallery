class Auth {
  token = localStorage.getItem("token");

  constructor() {
    this.authenticated = false;
  }

  login(callback) {
    this.authenticated = typeof this.token === "string" ? true : false;
    console.log("Authorised :: ", this.authenticated);
    callback();
  }

  logOut(callback) {
    localStorage.removeItem("token");
    this.authenticated = false;
    console.log("Authorised :: ", this.authenticated);
    callback();
  }

  isAuthorized() {
    console.log("Authorised :: ", this.authenticated);
    return this.authenticated;
  }
}

export default new Auth();

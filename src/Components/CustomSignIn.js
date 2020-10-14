import React, { Component } from "react";
import { Auth } from "aws-amplify";

export class CustomSignIn extends Component {
  constructor(props) {
    super(props);
    this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    this.signIn = this.signIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.state = {};
  }

  handleFormSubmission(evt) {
    evt.preventDefault();
    this.signIn();
  }

  async signIn() {
    const username = this.inputs.username;
    const password = this.inputs.password;
    try {
      Auth.signIn(username, password);
      this.props.onStateChange("signedIn", {});
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        this.props.updateUsername(username);
        await Auth.resendSignUp(username);
        this.props.onStateChange("confirmSignUp", {});
      } else if (err.code === "NotAuthorizedException") {
        // The error happens when the incorrect password is provided
        this.setState({ error: "Login failed." });
      } else if (err.code === "UserNotFoundException") {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        this.setState({ error: "Login failed." });
      } else {
        this.setState({ error: "An error has occurred." });
        console.error(err);
      }
    }
  }

  handleInputChange(evt) {
    this.inputs = this.inputs || {};
    const { name, value, type, checked } = evt.target;
    const check_type = ["radio", "checkbox"].includes(type);
    this.inputs[name] = check_type ? checked : value;
    this.inputs["checkedValue"] = check_type ? value : null;
    this.setState({ error: "" });
  }

  render() {
    return (
      <div className="mx-auto w-full max-w-xs">
        <div className="login-form">
          {this._validAuthStates.includes(this.props.authState) && (
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleFormSubmission}>
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  key="username"
                  name="username"
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-6">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  key="password"
                  name="password"
                  onChange={this.handleInputChange}
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-indigo-400 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={this.handleFormSubmission}
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}
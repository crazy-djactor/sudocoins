import React, { Component } from "react";
import { InternalApp } from "../Container/InternalApp";
import { CustomSignIn } from "./CustomSignIn";

class AuthWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername(newUsername) {
    this.setState({ username: newUsername });
  }

  render() {
    return (
      <div className="flex-1">
        <CustomSignIn
          authState={this.props.authState}
          updateUsername={this.updateUsername}
          onStateChange={this.props.onStateChange}
        />
        <InternalApp authState={this.props.authState} onStateChange={this.props.onStateChange} />
      </div>
    );
  }
}

export default AuthWrapper;
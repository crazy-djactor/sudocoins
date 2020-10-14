import React, { Component } from "react";
import logo from "../logo.svg";

export class InternalApp extends Component {
  render() {
    if (this.props.authState === "signedIn") {
      return (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Internal Application behind Login</p>
        </>
      );
    } else {
      return null;
    }
  }
}
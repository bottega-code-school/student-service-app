import React, { Component } from "react";
import Registration from "../auth/registration";
import Login from "../auth/login";

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

    this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(e) {
    this.props.history.push("/dashboard");
  }

  handleUnSuccessfulAuth(errorMessage) {
    this.setState({
      errorMessage:
        "There was an error processing your registration, please try again."
    });
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>

        <div>{this.state.errorMessage}</div>

        <Login
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
        />

        <Registration
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
        />
      </div>
    );
  }
}

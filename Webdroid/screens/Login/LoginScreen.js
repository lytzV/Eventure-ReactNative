import React, { Component } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import LoginForm from "./LoginForm";
import Background from "./Background";
import SubmitButton from "./SubmitButton";
import Signup from "./Signup";

export default class LoginScreen extends Component {
  render() {
    return (
      <Background>
        <Logo />
        <LoginForm />
        <Signup />
        <SubmitButton navigation={this.props.navigation} />
      </Background>
    );
  }
}

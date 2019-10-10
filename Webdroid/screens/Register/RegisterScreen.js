import React, { Component } from "react";
import PropTypes from "prop-types";
import Dimensions from "Dimensions";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import RegisterForm from "./RegisterForm";
import RegisterButton from "./RegisterButton";

export default class RegisterScreen extends Component {
  render() {
    return (
      <View style={styles.background}>
        <RegisterForm />
        <RegisterButton navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    width: null,
    height: null,
    resizeMode: "cover",
    paddingLeft: 60,
    paddingRight: 60
  }
});

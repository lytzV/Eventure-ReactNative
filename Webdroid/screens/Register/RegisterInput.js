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

export default class RegisterInput extends Component {
  render() {
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          id={this.props.id}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          onChangeText={text => this.updateForm({ text })}
          placeholderTextColor="black"
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
  updateForm = text => {
    RegisterForm.info[this.props.id] = text.text;
    //console.log(LoginForm.info);
  };
}
RegisterInput.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string
};
const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#FF7868",
    borderBottomColor: "#FF7868",
    borderBottomWidth: 1
  }
});

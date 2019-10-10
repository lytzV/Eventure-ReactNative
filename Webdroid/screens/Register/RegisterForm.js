import React, { Component } from "react";
import PropTypes from "prop-types";
import Dimensions from "Dimensions";
import Picker from "react-native-picker-select";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import RegisterInput from "./RegisterInput";

export default class RegisterForm extends Component {
  static info = { email: "", pswd1: "", pswd2: "", name: "", gender: "" };
  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.header}>Registration</Text>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <RegisterInput
            id="email"
            placeholder="Email"
            autoCapitalize={"none"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <RegisterInput
            id="pswd1"
            secureTextEntry={true}
            placeholder="Password (length >= 8)"
            autoCapitalize={"none"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <RegisterInput
            id="pswd2"
            secureTextEntry={true}
            placeholder="Re-type Password"
            autoCapitalize={"none"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <RegisterInput
            id="name"
            placeholder="Display Name"
            autoCapitalize={"none"}
            returnKeyType={"done"}
            autoCorrect={false}
          />
          <Picker
            onValueChange={value => (RegisterForm.info["gender"] = value)}
            //placeholder="{ label: 'de', value: 1 }"
            placeholder={{
              label: "Select a gender...",
              value: null,
              color: "#FF7868"
            }}
            items={[
              { label: "Unspecified", value: "-1" },
              { label: "Male", value: "0" },
              { label: "Female", value: "1" },
              { label: "Non-binary", value: "2" }
            ]}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    alignSelf: "stretch"
  },
  header: {
    fontSize: 24,
    color: "#FF7868",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  container: {
    alignItems: "stretch",
    justifyContent: "center"
  }
});

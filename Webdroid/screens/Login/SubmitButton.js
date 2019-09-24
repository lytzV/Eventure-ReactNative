import React, { Component } from "react";
import PropTypes from "prop-types";
import base64 from "react-native-base64";
import GlobalConstants from "../../GlobalConstants";
import Dimensions from "Dimensions";
import LoginForm from "./LoginForm";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View
} from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";

import spinner from "../../assets/images/loading.gif";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 40;

export default class SubmitButton extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    if (this.state.isLoading) return;
    const queryString = {
      usr: LoginForm.info["usr"],
      pswd: LoginForm.info["pswd"]
    };
    console.log(LoginForm.info["usr"]);
    console.log(LoginForm.info["pswd"]);
    var url =
      GlobalConstants.API_BASE_URL +
      "account/Authenticate?login=" +
      encodeURIComponent(queryString.usr) +
      "&password=" +
      encodeURIComponent(queryString.pswd);
    var httpheader = new Headers();
    var token = GlobalConstants.USERNAME + ":" + GlobalConstants.PASSWORD;
    httpheader.append("Authorization", "Basic " + base64.encode(token));
    let req = new Request(url, {
      method: "POST",
      headers: httpheader,
      credentials: "include"
    });
    console.log(req);
    fetch(req)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          isLoading: false,
          data: response
        });
        if (this.state.data.status == "success") {
          this.popAlert(this.state.data.status);
        }
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({ isLoading: true });
    /*Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      Actions.secondScreen();
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);*/
  }

  popAlert = status => {
    Alert.alert(
      status,
      "Welcome to Eventure!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN]
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}
          >
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>Sign In</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: changeScale }] }]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -95,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 100,
    alignSelf: "center",
    zIndex: 99,
    backgroundColor: "transparent"
  },
  text: {
    color: "white",
    backgroundColor: "transparent"
  },
  image: {
    width: 24,
    height: 24
  }
});

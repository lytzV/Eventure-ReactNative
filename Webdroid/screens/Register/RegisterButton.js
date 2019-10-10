import React, { Component } from "react";
import PropTypes from "prop-types";
import base64 from "react-native-base64";
import utf8 from "utf8";
import GlobalConstants from "../../GlobalConstants";
import Dimensions from "Dimensions";
import RegisterScreen from "./RegisterScreen";
import RegisterForm from "./RegisterForm";
import {
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View
} from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";
import { createStackNavigator, createAppContainer } from "react-navigation";

import spinner from "../../assets/images/loading.gif";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 40;

export default class RegisterButton extends Component {
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
      email: RegisterForm.info["email"],
      pswd1: RegisterForm.info["pswd1"],
      pswd2: RegisterForm.info["pswd2"],
      name: RegisterForm.info["name"],
      gender: RegisterForm.info["gender"]
    };
    console.log(queryString);
    if (queryString.pswd1 != queryString.pswd2) {
      this.popAlert("Your passwords did not match!");
    } else if (queryString.pswd1 == "") {
      this.popAlert("Your password cannot be empty!");
    } else {
      var url =
        GlobalConstants.API_BASE_URL +
        "account/Register?gender=" +
        encodeURIComponent(queryString.gender) +
        "&email=" +
        encodeURIComponent(queryString.email) +
        "&displayedName=" +
        encodeURIComponent(queryString.name) +
        "&password=" +
        encodeURIComponent(queryString.pswd1);
      var httpheader = new Headers();
      var token = GlobalConstants.USERNAME + ":" + GlobalConstants.PASSWORD;
      httpheader.append("Authorization", "Basic " + base64.encode(token));
      let req = new Request(url, {
        method: "POST",
        headers: httpheader,
        credentials: "include"
      });
      //https://api.eventure-app.com/account/Register?gender=0&email=lytzi%40berkeley%2Eedu&displayedName=Victor&password=eventure
      //https://api.eventure-app.com/account/Register?gender=0&email=lytzi%40berkeley%2Eedu&displayedName=Victor&password=eventure
      console.log(req);
      fetch(req)
        .then(async response => {
          const data = await response.text();
          console.log(data);
          this.setState({
            isLoading: false,
            data: data
          });
        })
        .catch(error => {
          console.error(error);
        });
      this.setState({ isLoading: true });
      /*Animated.timing(this.buttonAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }).start();*/

      setTimeout(() => {
        this._onGrow();
      }, 2000);

      setTimeout(() => {
        if (this.state.data == "success") {
          this.login();
        } else {
          this.popAlert(this.state.data);
        }
        this.setState({ isLoading: false });
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 2300);
    }
  }
  login = async () => {
    //await AsyncStorage.setItem("User", JSON.stringify(user));
    //this.props.navigation.navigate("Main");
    this.popWelcome("Welcome! please check your inbox and verify your email!");
  };

  popAlert = status => {
    Alert.alert(
      status,
      "Bamboozled!!!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };

  popWelcome = status => {
    Alert.alert(
      status,
      "Hooray!",
      [{ text: "OK", onPress: () => this.props.navigation.navigate("Login") }],
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
              <Text style={styles.text}>Sign Up</Text>
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
    top: 40,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FF7868",
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
    color: "black",
    backgroundColor: "transparent"
  },
  image: {
    width: 24,
    height: 24
  }
});

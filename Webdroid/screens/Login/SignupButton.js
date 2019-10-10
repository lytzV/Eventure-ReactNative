import React, { Component } from "react";
import PropTypes from "prop-types";
import base64 from "react-native-base64";
import GlobalConstants from "../../GlobalConstants";
import Dimensions from "Dimensions";
import LoginScreen from "./LoginScreen";
import LoginForm from "./LoginForm";
import UserSetting from "../EventOrgUser/UserSetting";
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

export default class SignupButton extends Component {
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
    this.register();
  }
  register = async () => {
    this.props.navigation.navigate("Register");
  };

  popAlert = status => {
    Alert.alert(
      status,
      "Bamboozled!!!",
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
    marginTop: -10,
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

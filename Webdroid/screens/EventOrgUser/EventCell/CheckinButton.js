import React, { Component } from "react";
import PropTypes from "prop-types";
import base64 from "react-native-base64";
import utf8 from "utf8";
import GlobalConstants from "../../../GlobalConstants";
import CheckinScreen from "./CheckinScreen";
import Dimensions from "Dimensions";
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

import spinner from "../../../assets/images/loading.gif";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 40;

export default class CheckinButton extends Component {
  static usr = null;
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isCheckedIn: false
    };
    this.test = props.test;
    this.eventId = props.eventId;
    this.orgId = props.orgId;
    this.showProfile = 0;
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _retrieveUser = async () => {
    try {
      const usr = await AsyncStorage.getItem("User");
      if (usr !== null) {
        await (CheckinButton.usr = usr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async _onPress() {
    console.log(this.test);
    if (this.state.isLoading) return;
    await this._retrieveUser();
    const queryString = {
      usr: JSON.parse(CheckinButton.usr).uuid,
      org: this.orgId,
      sheet: this.eventId,
      showProfile: this.showProfile
    };
    var url =
      GlobalConstants.API_BASE_URL +
      "events/Checkin?userId=" +
      encodeURIComponent(queryString.usr) +
      "&orgId=" +
      encodeURIComponent(queryString.org) +
      "&sheetId=" +
      encodeURIComponent(queryString.sheet) +
      "&showProfile=" +
      encodeURIComponent(queryString.showProfile);
    console.log(url);
    var httpheader = new Headers();
    var token = GlobalConstants.USERNAME + ":" + GlobalConstants.PASSWORD;
    httpheader.append("Authorization", "Basic " + base64.encode(token));
    let req = new Request(url, {
      method: "POST",
      headers: httpheader,
      credentials: "include"
    });
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
    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      if (this.state.data == "success") {
        this.popAlert(
          this.state.isCheckedIn
            ? "Sorry to see you go :("
            : "Congratulations! You are checked in!"
        );
        this.state.isCheckedIn = !this.state.isCheckedIn;
      } else {
        this.popAlert(this.state.data);
      }
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  popAlert = status => {
    Alert.alert(
      status,
      "",
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
              <Text style={styles.text}>
                {this.state.isCheckedIn ? "Cancel" : "Check In"}
              </Text>
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";

import logoImg from "../../assets/images/logo.png";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 250,
    height: 80
  },
  text: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "transparent",
    marginTop: 20
  }
});

import React from "react";
import base64 from "react-native-base64";
import GlobalConstants from "../../../GlobalConstants";
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  item: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "gainsboro"
  },
  text: {
    fontSize: 16
  }
});
export default class ManageAccount extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { manifest } = Constants;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.text}>Name</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Password</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Email</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Gender</Text>
        </View>
      </View>
    );
  }
}

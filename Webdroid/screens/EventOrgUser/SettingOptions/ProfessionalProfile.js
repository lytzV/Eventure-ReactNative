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
  header: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: "gainsboro"
  },
  headertext: {
    fontSize: 16,
    color: "dimgray"
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
  },
  separator: {
    flex: 1,
    backgroundColor: "gainsboro"
  }
});
export default class ManageAccount extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertext}>
            Let recruiters know more about you from event check-ins by filling
            out your profile information
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Full Name</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Area(s) of study</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Year of Graduation</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.item}>
          <Text style={styles.text}>Link to resume</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.item}>
          <Text style={styles.text}>LinkedIn Page (optional)</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>GitHub Page (optional)</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.item}>
          <Text style={styles.text}>Skills and Interests (optional)</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Additional Information</Text>
        </View>
      </View>
    );
  }
}

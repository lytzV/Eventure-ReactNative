import React from "react";
import { ExpoConfigView } from "@expo/samples";
import base64 from "react-native-base64";
import GlobalConstants from "../../../GlobalConstants";
import Constants from "expo-constants";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: "#FF7868",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 15,
    color: "#FFFFFF"
  },
  subtitle: {
    fontSize: 10,
    color: "#FFFFFF"
  }
});

export default class EventCell extends React.Component {
  static uuid;
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    EventCell.uuid = props.navigation.state.params.uuid;
    //console.log(props.navigation.state.params.uuid);
  }

  componentDidMount() {
    const queryString = {
      uuid: EventCell.uuid
    };
    var url =
      GlobalConstants.API_BASE_URL +
      "events/GetEvent?uuid=" +
      encodeURIComponent(queryString.uuid);
    var httpheader = new Headers();
    var token = GlobalConstants.USERNAME + ":" + GlobalConstants.PASSWORD;
    httpheader.append("Authorization", "Basic " + base64.encode(token));

    let req = new Request(url, {
      method: "POST",
      headers: httpheader,
      credentials: "include"
    });
    //console.log(req);
    fetch(req)
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        this.setState({
          isLoading: false,
          data: { response }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    event = this.state.data.response;
    console.log(event);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{event.Title}</Text>
        <Text style={styles.subtitle}>{event["Start time"]}</Text>
        <Text style={styles.subtitle}>{event.Location}</Text>
        <Text style={styles.subtitle}>{event["Organization title"]}</Text>
      </View>
    );
  }
  reveal = item => {
    //console.log('Selected Item :',item);
    this.props.navigation.navigate("Details", { ...item });
    //this.props.navigation.navigate('Details');
    //console.log('yay');
  };

  //return <ExpoConfigView />;
}

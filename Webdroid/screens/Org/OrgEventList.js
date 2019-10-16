import React from "react";
import Editor from "./Editor";
import base64 from "react-native-base64";
import GlobalConstants from "../../GlobalConstants";
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

function Item({ title, when, where, who }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{when}</Text>
      <Text style={styles.subtitle}>{where}</Text>
    </View>
  );
}

export default class OrgEventList extends React.Component {
  static org = "berkeleyAcademics";
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async _retrieveUser() {
    try {
      const usr = await AsyncStorage.getItem("User");
      if (usr !== null) {
        await (OrgEventList.org = usr);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    await this._retrieveUser();
    var url = GlobalConstants.API_BASE_URL + "events/List";
    var httpheader = new Headers();
    var token = GlobalConstants.USERNAME + ":" + GlobalConstants.PASSWORD;
    httpheader.append("Authorization", "Basic " + base64.encode(token));
    let req = new Request(url, {
      method: "POST",
      headers: httpheader,
      //body: JSON.stringify({ orgId: "berkeleyAcademics" }),
      credentials: "include"
    });
    fetch(req)
      .then(response => response.json())
      .then(response => {
        var events = response;
        filtered = events.filter(e => e["Organization"] == OrgEventList.org);
        this.setState({
          isLoading: false,
          data: filtered
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
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.reveal(item)}>
              <Item
                title={item.Title}
                when={item["Start time"]}
                where={item.Location}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.uuid}
        />
      </View>
    );
  }
  reveal = item => {
    this.props.navigation.navigate("Edit", { ...item });
  };
}

OrgEventList.navigationOptions = {
  title: "My Events"
};

import React from "react";
import EventCell from "../EventCell/EventCell";
import base64 from "react-native-base64";
import GlobalConstants from "../../../GlobalConstants";
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";

const styles = StyleSheet.create({
  item: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: "#FF7868",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: "center"
  },
  infocontainer: {
    flex: 1,
    padding: 20,
    marginBottom: 5
  },
  title: {
    fontSize: 15,
    color: "#000000"
  },
  subtitle: {
    fontSize: 10,
    color: "#708090"
  }
});

//this is a functional component
function Item({ title, when, where, who, cover }) {
  return (
    <View style={styles.item}>
      <View style={styles.infocontainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{when}</Text>
        <Text style={styles.subtitle}>{where}</Text>
        <Text style={styles.subtitle}>{who}</Text>
      </View>
    </View>
  );
}

export default class CheckedInEvents extends React.Component {
  static usrId = "";
  constructor(props) {
    super(props);
    CheckedInEvents.usrId = props.navigation.state.params.uuid;
    this.state = {
      isLoading: true,
      search: ""
    };
  }

  componentDidMount() {
    const queryString = {
      usr: CheckedInEvents.usrId
    };
    var url =
      GlobalConstants.API_BASE_URL +
      "events/GetCheckedInEvents?userId=" +
      encodeURIComponent(queryString.usr);
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
        for (let e of events) {
          //console.log(e["Start time"])
        }
        this.setState({
          isLoading: false,
          data: events
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
      <View
        style={{ flex: 1, paddingTop: 0, marginTop: Constants.statusBarHeight }}
      >
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.reveal(item)}>
              <Item
                title={item.Title}
                when={item["Start time"]}
                where={item.Location}
                who={item["Organization title"]}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.uuid}
        />
      </View>
    );
  }

  //arrow functions don't need binding because it doesn't have "this" when called, https://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
  //methods in JS define their context when executed but not defined, so "this" is not necessarily tied to its creator, that's why we need binding for normal functions
  reveal = item => {
    //console.log('Selected Item :',item);
    //console.log(EventCell.uuid);
    this.props.navigation.navigate("Details", { ...item });
  };
}

CheckedInEvents.navigationOptions = {
  title: "Events"
};

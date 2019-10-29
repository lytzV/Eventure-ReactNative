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
  TouchableOpacity,
  Image,
  Button,
  AsyncStorage
} from "react-native";
import berkeley from "../../../assets/images/berkeley.png";
import current from "../../../DataStructure/User";

const styles = StyleSheet.create({
  imgcontainer: {
    flex: 3
  },
  infocontainer: {
    flex: 2,
    paddingHorizontal: 15,
    justifyContent: "center"
  },
  container: {
    flex: 1
  },
  cover: {
    //aspectRatio: 17 / 9,
    width: 200,
    height: 300,
    resizeMode: "contain",
    marginHorizontal: 0
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
  },
  button: {
    flex: 0,
    backgroundColor: "#fff",
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "gainsboro"
  }
});

export default class EventCell extends React.Component {
  static img;
  static uuid;
  constructor(props) {
    super(props);
    EventCell.uuid = props.navigation.state.params.uuid;
    this.state = {
      isLoading: true,
      isInterested: current.current["interestedEvents"].includes(
        '"' + EventCell.uuid.toString() + '"'
      ),
      isFavorited: current.current["favoritedEvents"].includes(
        '"' + EventCell.uuid.toString() + '"'
      )
    };
  }

  async componentDidMount() {
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
    fetch(req)
      .then(response => response.json())
      .then(response => {
        this.setState({
          isLoading: false,
          data: { response }
        });
      })
      .catch(error => {
        console.error(error);
      });
    EventCell.img = await this.retrieveCover();
  }
  async retrieveCover() {
    const queryString = {
      uuid: EventCell.uuid
    };
    var url =
      GlobalConstants.API_BASE_URL +
      "events/GetEventCover?uuid=" +
      encodeURIComponent(queryString.uuid);
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
        const str = await response.clone().text();
        if (str == "no cover found") {
          console.log("berkeley");
          this.setState({
            img: base64.encode("../../../assets/images/berkeley.png")
          });
        } else {
          var data = await response.blob();
          console.log(data);
          this.setState({
            img: base64.encode(URL.createObjectURL(data))
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  mark(status) {
    const queryString = {
      uuid: EventCell.uuid,
      usr: current.current
    };
    if (status == "interested") {
      if (
        current.current["interestedEvents"].includes(
          '"' + EventCell.uuid.toString() + '"'
        )
      ) {
        action = 0;
        current.current["interestedEvents"] = current.current[
          "interestedEvents"
        ].filter(item => item !== '"' + EventCell.uuid.toString() + '"');
        //console.log(current.current["interestedEvents"]);
        this.setState({
          isInterested: false
        });
      } else {
        action = 1;
        current.current["interestedEvents"].push(
          '"' + EventCell.uuid.toString() + '"'
        );
        this.setState({
          isInterested: true
        });
        //console.log(current.current["interestedEvents"]);
      }
      console.log(this.state.isInterested);
    }
    if (status == "favorited") {
      if (
        current.current["favoritedEvents"].includes(
          '"' + EventCell.uuid.toString() + '"'
        )
      ) {
        action = 0;
        current.current["favoritedEvents"] = current.current[
          "favoritedEvents"
        ].filter(item => item !== '"' + EventCell.uuid.toString() + '"');
        this.setState({
          isFavorited: false
        });
      } else {
        action = 1;
        current.current["favoritedEvents"].push(
          '"' + EventCell.uuid.toString() + '"'
        );
        this.setState({
          isFavorited: true
        });
      }
    }
    var url =
      GlobalConstants.API_BASE_URL +
      "events/MarkEvent?userId=" +
      encodeURIComponent(queryString.usr.uuid) +
      "&eventId=" +
      encodeURIComponent(queryString.uuid) +
      "&" +
      status +
      "=" +
      action;
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
        const str = await response.clone().text();
        console.log(str);
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
    //src = base64.encode(berkeley);
    //console.log(`data:image/png;base64,${src}`);

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.title}>{event.Title}</Text>
          <Text style={styles.subtitle}>{event["Start time"]}</Text>
          <Text style={styles.subtitle}>{event.Location}</Text>
          <Text style={styles.subtitle}>{event["Organization title"]}</Text>
        </View>
        <View style={styles.button}>
          <Button
            title={
              this.state.isInterested
                ? "Ain't Interested No More"
                : "Count Me In!"
            }
            color="black"
            onPress={() => this.mark("interested")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={
              this.state.isFavorited
                ? "Ain't Favorited No More"
                : "I Love This!"
            }
            color="black"
            onPress={() => this.mark("favorited")}
          />
        </View>
      </View>
    );
  }
}

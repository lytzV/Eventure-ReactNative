import React from "react";
import base64 from "react-native-base64";
import GlobalConstants from "../../GlobalConstants";
import { SearchBar } from "react-native-elements";
import Constants from "expo-constants";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  View
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: "#FF7868",
    opacity: 0.87,
    padding: 20,
    marginVertical: 4,
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

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={[styles.title, styles.color]}>{title}</Text>
    </View>
  );
}

export default class OrgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      search: ""
    };
  }
  updateSearch = search => {
    this.setState({
      search: search
    });
  };
  componentDidMount() {
    var url = GlobalConstants.API_BASE_URL + "account/ListOrgs";
    var httpheader = new Headers();
    var token = GlobalConstants.USERNAME + ":" + GlobalConstants.PASSWORD;
    httpheader.append("Authorization", "Basic " + base64.encode(token));
    let req = new Request(url, {
      method: "POST",
      headers: httpheader,
      //body: JSON.stringify({'orgId': 'berkeleyAcademics'}),
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
      <View style={{ flex: 1, paddingTop: 20 }}>
        <View
          style={{
            marginHorizontal: 20,
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderColor: "#FFFFFF"
            //borderWidth: 20
          }}
        >
          <SearchBar
            placeholder="Search Clubs..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            lightTheme={true}
            backgroundColor="whitesmoke"
            containerStyle={{
              backgroundColor: "#FFFFFF",
              borderColor: "#FFFFFF",
              borderRadius: 10,
              shadowColor: "white",
              borderBottomColor: "transparent",
              borderTopColor: "transparent"
            }}
            inputContainerStyle={{
              backgroundColor: "whitesmoke",
              borderColor: "#FFFFFF",
              borderRadius: 10
            }}
          />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Item title={item.Title} />}
          keyExtractor={item => item.ID}
        />
      </View>
    );
  }
}

OrgList.navigationOptions = {
  title: "Organizations"
};

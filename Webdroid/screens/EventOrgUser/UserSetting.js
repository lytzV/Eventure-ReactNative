//import React from 'react';
//import { ExpoConfigView } from '@expo/samples';

//export default function SettingsScreen() {
/**
 * Go ahead and delete ExpoConfigView and replace it with your content;
 * we just wanted to give you a quick view of your config.
 */
//return <ExpoConfigView />;
//}

import React from "react";
import {
  SectionList,
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Constants from "expo-constants";
import User from "../../DataStructure/User";

export default class UserSetting extends React.Component {
  static user;
  constructor(props) {
    super(props);
    //console.log(User.current.uuid);
  }
  async componentDidMount() {
    var user = await this.getUser();
    UserSetting.user = JSON.parse(user)["user info"];
    console.log(UserSetting.user);
  }
  // TODO: Fix this with User.current after you get the guest signin done
  async getUser() {
    return await AsyncStorage.getItem("User");
  }
  render() {
    const sections = [
      {
        data: ["Manage Account", "Professional Profile"],
        title: "PERSONAL INFORMATION"
      },
      {
        data: ["Scan Event Code", "Events I Checked In"],
        title: "EVENT CHECK-IN"
      },
      {
        data: ["Favorite Events", "Interested Events", "My Tags"],
        title: "PERSONAL INTEREST"
      }
    ];
    var user = UserSetting.user;
    return (
      <View style={styles.container}>
        <SectionList
          style={styles.container}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          stickySectionHeadersEnabled={true}
          keyExtractor={(item, index) => index}
          sections={sections}
        />
        <View style={styles.button}>
          <Button
            title={user != null ? "Sign Out" : "Sign In"}
            color="black"
            onPress={() => this.inOrOut()}
          />
        </View>
      </View>
    );
  }
  //lambda func
  inOrOut = async () => {
    if (UserSetting.user != null) {
      console.log("clearing user...");
      await AsyncStorage.clear();
      User.current = null;
    }
    this.props.navigation.navigate("Auth");
  };
  renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />;
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.reveal(item)}>
        <SectionContent style={styles.item}>
          <Text style={styles.sectionContentText}>{item}</Text>
        </SectionContent>
      </TouchableOpacity>
    );
  };
  reveal = item => {
    switch (item) {
      case "Manage Account":
        this.props.navigation.navigate("account", { ...UserSetting.user });
        break;
      case "Professional Profile":
        this.props.navigation.navigate("pro", { ...UserSetting.user });
        break;
      case "Scan Event Code":
        this.props.navigation.navigate("QR");
        break;
      case "Events I Checked In":
        this.props.navigation.navigate("checked", { ...UserSetting.user });
        break;
      case "Favorite Events":
        this.props.navigation.navigate("favorited", { ...UserSetting.user });
        break;
      case "Interested Events":
        this.props.navigation.navigate("interested", { ...UserSetting.user });
        break;
      case "My Tags":
      default:
    }
  };
}

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
};

const SectionContent = props => {
  return <View style={styles.item}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  button: {
    flex: 0,
    backgroundColor: "#fff",
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "gainsboro"
  },
  item: {
    backgroundColor: "#FF7868",
    opacity: 0.88,
    marginVertical: 4,
    marginHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 15
  },
  sectionHeaderContainer: {
    backgroundColor: "#fbfbfb",
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ededed"
  },
  sectionHeaderText: {
    fontSize: 14
  },
  sectionContentText: {
    color: "#FFFFFF",
    fontSize: 14
  }
});
UserSetting.navigationOptions = {
  title: "Me"
};

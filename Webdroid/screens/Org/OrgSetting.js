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

export default class OrgSetting extends React.Component {
  render() {
    const { manifest } = Constants;
    const sections = [
      {
        data: ["Manage Account", "Orgnization Profile"],
        title: "ORGNIZATION INFORMATION"
      },
      {
        data: ["Scan Ticket Code", "Event Statistics", "Subscribers"],
        title: "EVENTS AND SUBSCRIPTIONS"
      }
    ];
    var user = AsyncStorage.getItem("User");
    console.log(user);
    return (
      <View style={styles.container}>
        <SectionList
          style={styles.container}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          stickySectionHeadersEnabled={true}
          keyExtractor={(item, index) => index}
          //ListHeaderComponent={ListHeader}
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
  inOrOut = () => {
    var user = AsyncStorage.getItem("User");
    if (user != null) {
      AsyncStorage.clear();
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
    if (item == "Scan Event Code") {
      this.props.navigation.navigate("QR");
    }
    //this.props.navigation.navigate("Details", { ...item });
  };
}

const ListHeader = () => {
  const { manifest } = Constants;

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <AppIconPreview iconUrl={manifest.iconUrl} />
      </View>

      <View style={styles.titleTextContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {manifest.name}
        </Text>

        <Text style={styles.slugText} numberOfLines={1}>
          {manifest.slug}
        </Text>

        <Text style={styles.descriptionText}>{manifest.description}</Text>
      </View>
    </View>
  );
};

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

const AppIconPreview = ({ iconUrl }) => {
  if (!iconUrl) {
    iconUrl =
      "https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png";
  }

  return (
    <Image
      source={{ uri: iconUrl }}
      style={{ width: 64, height: 64 }}
      resizeMode="cover"
    />
  );
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
    marginVertical: 8,
    marginHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 15
  },
  sectionHeaderContainer: {
    backgroundColor: "#fbfbfb",
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
OrgSetting.navigationOptions = {
  title: "Me"
};

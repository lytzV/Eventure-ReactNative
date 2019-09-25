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
  SafeAreaView
} from "react-native";
import Constants from "expo-constants";

export default class UserSetting extends React.Component {
  render() {
    const { manifest } = Constants;
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
            color="#f194ff"
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
      <SectionContent style={styles.item}>
        <Text style={styles.sectionContentText}>{item}</Text>
      </SectionContent>
    );
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
    backgroundColor: "#fff"
  },
  item: {
    backgroundColor: "#FF7868",
    marginVertical: 8,
    marginHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 15
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row"
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2
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
  },
  nameText: {
    fontWeight: "600",
    fontSize: 18
  },
  slugText: {
    color: "#a39f9f",
    fontSize: 14,
    backgroundColor: "transparent"
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: "#4d4d4d"
  }
});
UserSetting.navigationOptions = {
  title: "Me"
};

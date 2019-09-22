import React from 'react';
import base64 from 'react-native-base64'
import GlobalConstants from '../../GlobalConstants'
import Constants from 'expo-constants';
import { StyleSheet, FlatList, ActivityIndicator, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 10
  }
});

function Item({ title, when, where, who}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{when}</Text>
      <Text style={styles.subtitle}>{where}</Text>
      <Text style={styles.subtitle}>{who}</Text>
    </View>
  );
}

export default class EventList extends React.Component{
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    var url = GlobalConstants.API_BASE_URL + "events/List";
    var httpheader = new Headers()
    var token = GlobalConstants.USERNAME+":"+GlobalConstants.PASSWORD
    httpheader.append('Authorization', 'Basic '+ base64.encode(token))
    let req = new Request(url,
      {
          method: 'POST',
          headers: httpheader,
          //body: JSON.stringify({'orgId': 'berkeleyAcademics'}),
          credentials: 'include'
      }
    )
    fetch(req)
    .then(response => response.json())
    .then((response) => {
      var events = response
      for (let e of events){
        console.log(e["Start time"])
      }
      this.setState({
          isLoading: false,
          data: events,
      })
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  render()
  {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => <Item title={item.Title} when={item["Start time"]} where={item.Location} who={item["Organization title"]} />}
            keyExtractor={item => item.uuid}
          />
      </View>
    );
  }
}

EventList.navigationOptions = {
  title: 'Events',
};

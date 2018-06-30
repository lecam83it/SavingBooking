import React, { Component } from 'react';
import { View, Text, WebView, StyleSheet, Image, TouchableOpacity, YellowBox, StatusBar, Platform } from 'react-native';
import firebaseApp from '../firebase/FirebaseConfig.js';

YellowBox.ignoreWarnings(["Module RCTImageLoader", "Encountered an error", "Setting a timer for a long period of time"]);

class LoadWeb extends Component {

  constructor(props) {
    super(props)
    this.state = {
      LINK: 'http://savingbooking.com.vn/app1.php',
      imageLINK: "",
      datas: [],
    }
    this.itemsRef = this.getRef();
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          image: child.val().image,
          url: child.val().url,
          key: child.key
        });
      });

      this.setState({
        datas: items
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style={Platform.OS === "ios" ? {marginTop: 20,} : {marginTop : 0}}/>
        <WebView
          source={{ uri: this.state.LINK }}
        />
        <View style={styles.bottomBar}>
          {
            this._renderButton()
          }
        </View>
      </View >
    );
  }
  _renderButton() {
    let views = [];
    this.state.datas.forEach(e => {
      views.push(
        <TouchableOpacity
          onPress={() => {
            this.setState({
              LINK: e.url,
            })
          }}
          key={e.key}>
          <Image style={styles.bottomIcon}
            source={{ uri: e.image }} />
        </TouchableOpacity>
      )
    })
    return views;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomBar: {
    // flex: 8,
    height: 60,
    backgroundColor: "#D2CDD7",
    opacity: 0.85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    // alignItems: 'center'
  },
  bottomIcon: {
    width: 50,
    height: 50,
    margin: 5,
  }
});

export default LoadWeb;
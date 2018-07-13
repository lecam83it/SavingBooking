import React, { Component } from "react";
import {
  View,
  Text,
  WebView,
  StyleSheet,
  Image,
  TouchableOpacity,
  YellowBox,
  StatusBar,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { fetchItems } from "../actions/actionCreators";

YellowBox.ignoreWarnings([
  "Module RCTImageLoader",
  "Encountered an error",
  "Setting a timer for a long period of time"
]);

class LoadWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LINK: "http://savingbooking.com.vn/app1.php",
      imageLINK: "",
      datas: []
    };

    // this.itemsRef = this.getRef();
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItemsFirebase(itemsRef) {
    itemsRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
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
  _renderButtonFirebase() {
    let views = [];
    this.state.datas.forEach(e => {
      views.push(
        <TouchableOpacity
          onPress={() => {
            this.setState({
              LINK: e.url
            });
          }}
          key={e.key}
        >
          <Image style={styles.bottomIcon} source={{ uri: e.image }} />
        </TouchableOpacity>
      );
    });
    return views;
  }
  componentDidMount() {
   // this.listenForItemsFirebase(this.itemsRef);
    this.props.fetchItems("http://demo02.hifapp.com/api/product");
  }
  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          style={Platform.OS === "ios" ? { marginTop: 20 } : { marginTop: 0 }}
        />
        <WebView source={{ uri: this.state.LINK }} />
        <View style={styles.bottomBar}>{this._renderButton()}</View>
      </View>
    );
  }
  _renderButton() {
    let views = [];
    this.props.items.forEach(e => {
      views.push(
        <TouchableOpacity
          onPress={() => {
            this.setState({
              LINK: e.product_link
            });
          }}
          key={e.product_index}
        >
          <Image style={styles.bottomIcon} source={{ uri: e.product_icon }} />
        </TouchableOpacity>
      );
    })
    return views;
  }
  
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomBar: {
    // flex: 8,
    height: width / 6,
    backgroundColor: "#D2CDD7",
    opacity: 0.85,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center'
  },
  bottomIcon: {
    width: width / 6 - 10 ,
    height: width / 6 - 10,
    margin: 5,
  }
});


function mapStateToProps(state) {
  return {
    items: state.items.items
  };
}

export default connect(
  mapStateToProps,
  { fetchItems }
)(LoadWeb);

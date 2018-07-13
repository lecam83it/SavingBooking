/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from "react-redux";
import  store from "./src/store";
import LoadWeb from "./src/webview/LoadWeb";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoadWeb />
      </Provider>
    );
  }
}
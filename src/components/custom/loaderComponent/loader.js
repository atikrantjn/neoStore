import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

export class Loader extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={30} color="#0000ff" />
      </View>
    );
  }
}

export default Loader;

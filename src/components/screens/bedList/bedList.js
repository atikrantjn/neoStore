import React, {Component} from 'react';
import {View} from 'react-native';
import BedListModule from '../../custom/bedListComponent/index';
export default class bedList extends Component {
  render(props) {
    return (
      <View>
        <BedListModule />
      </View>
    );
  }
}

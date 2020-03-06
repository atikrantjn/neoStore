import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import FlatList1 from '../../custom/flatList component/index';
export default class BedList extends Component {
  render(props) {
    return (
      <View>
        <FlatList1 />
      </View>
    );
  }
}

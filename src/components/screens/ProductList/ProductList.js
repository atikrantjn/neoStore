import React, {Component} from 'react';
import {View} from 'react-native';

import ProductListModule from '../../custom/productListComponent/index';
export default class ProductList extends Component {
  render() {
    const {id} = this.props.route.params;
    console.log('hsgdgjhdg', this.props.route.params.id);

    return (
      <View>
        <ProductListModule id={id} />
      </View>
    );
  }
}

import React, {Component} from 'react';
import {View} from 'react-native';

import ProductListModule from '../../custom/productListComponent/index';
export default class ProductList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {id} = this.props.route.params;
    console.log('hsgdgjhdg bhaiiiiiiiii', this.props.route.params.id);

    return (
      <View>
        <ProductListModule id={id} {...this.props} />
      </View>
    );
  }
}

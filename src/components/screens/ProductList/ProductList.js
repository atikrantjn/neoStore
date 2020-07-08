import React, {Component} from 'react';
import {View} from 'react-native';

import ProductListModule from '../../custom/productListComponent/index';
class ProductList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {id} = this.props.route.params;

    return (
      <View>
        <ProductListModule id={id} {...this.props} />
      </View>
    );
  }
}

export default ProductList;

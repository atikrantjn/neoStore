import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {API_URL, request} from '../../../config/api';
import RenderProductItem from './renderProductItem';
import Loader from '../../custom/loaderComponent/loader';

export default class ProductListModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const id = this.props.id;

    const data = null;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    this.setState({isLoading: true});

    request(
      this.productListCallBack,
      data,
      'GET',
      API_URL.PRODUCT_LIST_API + id,
      header,
    );
  }

  productListCallBack = {
    success: response => {
      this.setState({data: response.product_details, isLoading: false});
    },
    error: error => {
      console.log('errr', error);
    },
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#B4B4B4',
        }}
      />
    );
  };
  render() {
    return (
      <View>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={this.state.data}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({item}) => {
              let rating = parseFloat(item.product_rating);

              return (
                <RenderProductItem
                  {...this.props}
                  productId={item.product_id}
                  product_image={item.product_image}
                  product_name={item.product_name}
                  product_material={item.product_material}
                  product_cost={item.product_cost}
                  product_rating={rating}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}

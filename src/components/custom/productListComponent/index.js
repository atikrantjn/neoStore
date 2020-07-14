import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {API_URL, request} from '../../../config/api';
import RenderProductItem from './renderProductItem';
import ModalLoader from '../modalLoader/index';
import styles from './styles';

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

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    this.setState({isLoading: true});

    request(
      this.productListCallBack,
      null,
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
    return <View style={styles.itemSeperator} />;
  };
  render() {
    return (
      <View>
        {this.state.isLoading ? (
          <ModalLoader isLoading={this.state.isLoading} />
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

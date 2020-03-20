import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import {request, API_URL, BASE_URL} from '../../../../config/api';

export class MyCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartData: [],
    };
  }

  //cart data api function

  componentDidMount() {
    this.cartData();
  }

  cartData() {
    const data = null;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjc1LCJpYXQiOjE1ODQ2MjEyNTF9.ND-nQ9tqQlIZHNGstw1QvhIW8kO8FAwSSPKygHjUT7w',
    };

    request(this.cartCallBack, data, 'GET', API_URL.GET_CUST_CART_API, header);
  }

  cartCallBack = {
    success: response => {
      const productDetails = JSON.parse(
        JSON.stringify(response.product_details),
      );
      this.setState({cartData: response.product_details});
      // console.log('product details', productDetails);
    },
    error: error => {
      console.log('errr', error);
    },
  };

  FlatListItemSeparator = () => {
    return <View style={styles.itemSeperator} />;
  };

  //footer component for flatlist

  footer = () => {
    return (
      <View style={styles.footerComponentContainer}>
        <View>
          <Text style={styles.footerPrice}>price</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.footerOrderBTN}
            onPress={() => {
              alert('hello');
            }}>
            <Text style={styles.footerBTNtext}>ORDER NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.cartData}
          ListFooterComponent={this.footer}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => {
            const productItem = JSON.parse(JSON.stringify(item));
            return (
              <ScrollView>
                <View style={styles.container}>
                  <TouchableOpacity>
                    <View style={styles.listContainer}>
                      <Image
                        style={styles.imageStyle}
                        source={{
                          uri: BASE_URL + productItem.product_id.product_image,
                        }}
                      />

                      <View style={styles.productNameContainer}>
                        <Text numberOfLines={1} style={styles.productName}>
                          {productItem.product_id.product_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.productMaterial}>
                          {productItem.product_id.product_material}
                        </Text>

                        <View style={styles.productCostContainer}>
                          <Text style={styles.productCost}>
                            {'Rs' + ' ' + productItem.product_cost}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default MyCart;

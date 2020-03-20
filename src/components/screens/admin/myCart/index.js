import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
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
      console.log('product details', productDetails);
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

  footer = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 15,
        }}>
        <View>
          <Text style={{fontSize: 25}}>price</Text>
        </View>

        <View>
          <TouchableOpacity
            style={{backgroundColor: 'red', borderRadius: 7, padding: 7}}
            onPress={() => {
              alert('hello');
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}>
              ORDER NOW
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    console.log('cart data from api', this.state.cartData);

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
                <View
                  style={{
                    flex: 1,
                    margin: 10,
                  }}>
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 10,
                      }}>
                      <Image
                        style={{width: 120, height: 120}}
                        source={{
                          uri: BASE_URL + productItem.product_id.product_image,
                        }}
                      />

                      <View style={{flexDirection: 'column'}}>
                        <Text numberOfLines={1} style={{fontSize: 30}}>
                          {productItem.product_id.product_name}
                        </Text>
                        <Text numberOfLines={1} style={{fontSize: 20}}>
                          {productItem.product_id.product_material}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginVertical: 15,
                          }}>
                          <Text style={{fontSize: 25}}>
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

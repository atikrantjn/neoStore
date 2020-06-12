import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import NumericInput from 'react-native-numeric-input';
import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL, API_URL, request} from '../../../config/api';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
export class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartData: [],
      product_cost: '',
      loggedInData: [],

      customerData: {},
      quantity: '1',

      token: '',
    };
  }

  //order now

  // orderNow = () => {
  //   const data = {
  //     product_id: this.state.product_data.product_id,
  //     quantity: this.state.quantity,
  //   };
  //   console.log('data', data);
  //   const {token} = this.state;
  //   const header = {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Authorization: 'Bearer ' + token,
  //   };

  //   request(
  //     this.orderNowCallback,
  //     data,
  //     'POST',
  //     API_URL.ADD_PRODUCT_TO_CART_CHECKOUT_API,
  //     header,
  //   );
  // };

  // orderNowCallback = {
  //   success: response => {
  //     console.log('repsspshsjshj', response);
  //   },
  //   error: error => {
  //     console.log('errr', error);
  //   },
  // };

  componentDidMount = async () => {
    // const {sendProdData} = this.props.route.params;

    // this.setState({product_data: sendProdData});

    await this.getData();

    await this.getProductData();
  };

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({
          token: value.token,
          loggedInData: value.customer_address[0],
          customerData: value.customer_details,
        });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  getProductData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('cart'));

      if (value !== null) {
        this.setState({cartData: value});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  FlatListItemSeparator = () => {
    return <View style={styles.renderitemSeperator} />;
  };

  decreaseQuantity = async id => {
    const dataFromCart = JSON.parse(await AsyncStorage.getItem('cart'));
    const index = dataFromCart.findIndex(result => {
      return result._id === id;
    });
    if (dataFromCart[index].quantity <= 1) {
      const a = alert('are u sure u wanna remove item');
    } else if (dataFromCart[index].quantity > 1) {
      dataFromCart[index].quantity = dataFromCart[index].quantity - 1;
      AsyncStorage.setItem('cart', JSON.stringify(dataFromCart));
      this.setState({cartData: JSON.parse(AsyncStorage.getItem('cart'))});
    }
  };

  increaseQuantity = async id => {
    const dataFromCart = JSON.parse(await AsyncStorage.getItem('cart'));

    const index = dataFromCart.findIndex(result => {
      return result._id === id;
    });

    if (dataFromCart[index].quantity > 0) {
      dataFromCart[index].quantity = dataFromCart[index].quantity + 1;
      AsyncStorage.setItem('cart', JSON.stringify(dataFromCart));
      this.setState({cartData: JSON.parse(AsyncStorage.getItem('cart'))});
    }
  };

  render() {
    const {cartData, customerData, loggedInData} = this.state;

    const userFullName = customerData.first_name + ' ' + customerData.last_name;

    return (
      <ScrollView>
        <View style={styles.userDetailContainer}>
          <View>
            <Text style={styles.userName}>{userFullName}</Text>
          </View>

          <View style={styles.userAddressContainer}>
            <Text style={styles.userAddress}>{loggedInData.address}</Text>
          </View>
          <View style={styles.changeAddressBTNcontainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Add Address');
              }}
              style={styles.changeAddressBTN}>
              <Text style={styles.changeAddressBTNtext}>
                Change Or Add Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.moduleSeperatorline} />
        <View style={{flex: 1}}>
          <View style={{flex: 0.9}}>
            <FlatList
              data={this.state.cartData}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({item}) => {
                const productItem = JSON.parse(JSON.stringify(item));

                return (
                  <View style={styles.rendercontainer}>
                    <TouchableOpacity>
                      <View style={styles.renderlistContainer}>
                        <Image
                          style={styles.renderimageStyle}
                          source={{
                            uri:
                              BASE_URL + productItem.product_id.product_image,
                          }}
                        />

                        <View style={styles.renderproductNameContainer}>
                          <Text style={styles.renderproductName}>
                            {productItem.product_id.product_name}
                          </Text>
                          <Text style={styles.renderproductMaterial}>
                            {productItem.product_id.product_material}
                          </Text>

                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.minusBtn}>
                              <FaIcon
                                name={'minus'}
                                size={25}
                                onPress={() => {
                                  const p_id = item._id;
                                  this.decreaseQuantity(p_id);
                                }}
                              />
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 19,
                                padding: 5,
                                marginLeft: 10,
                              }}>
                              {item.quantity}
                            </Text>

                            <TouchableOpacity style={styles.plusBtn}>
                              <FaIcon
                                name={'plus'}
                                size={25}
                                onPress={() => {
                                  const p_id = item._id;
                                  this.increaseQuantity(p_id);
                                }}
                              />
                            </TouchableOpacity>
                          </View>

                          <View style={styles.renderproductCostContainer}>
                            <Text style={styles.productCost}>
                              {'Rs' +
                                ' ' +
                                item.quantity * productItem.product_cost}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index}
            />

            <View style={styles.moduleSeperatorline} />

            <View style={styles.footerContainer}>
              <View style={styles.footerPriceDetailsContainer}>
                <Text style={styles.footerPriceDetails}>Price Details</Text>
              </View>

              <View style={styles.productCostContainer}>
                <View style={{width: '50%'}}>
                  <Text style={styles.productPrice}>Price</Text>
                </View>
                <View>
                  <Text style={styles.productPrice}>{'Rs' + ' '}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.moduleSeperatorline} />

          <View style={{flex: 0.1}}>
            <View style={styles.orderSummaryFooterContainer}>
              <View>
                <Text style={styles.productPrice}>{'Rs' + ' '}</Text>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.orderNowBTN}
                  onPress={() => {
                    this.orderNow();
                  }}>
                  <Text style={styles.orderNowBTNtext}>ORDER NOW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default OrderSummary;

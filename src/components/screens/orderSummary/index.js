import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';

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
      customerData: {},
      quantity: 1,
      token: '',
      totalOrder: 0,
      custAddress: [],
    };
  }

  //order now

  orderNowHandler = async () => {
    const title = 'Time to choose!';
    const message = 'please confirm to place order';
    const buttons = [
      {text: 'Cancel', type: 'cancel'},
      {
        text: 'confirm',
        onPress: () => {
          this.placeOrder();
        },
      },
    ];

    Alert.alert(title, message, buttons);
  };

  placeOrder = () => {
    const {token} = this.state;

    let data = this.state.cartData;
    let flag = [{flag: 'checkout'}];
    let data1 = [...data, ...flag];

    // let data1 = [
    //   {
    //     _id: '5cfe41a5b4db0f338946eac3',
    //     product_id: '5cfe41a5b4db0f338946eac3',
    //     quantity: 1,
    //   },
    //   {flag: 'checkout'},
    // ];

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    request(
      this.placeOrderCallback,
      data1,
      'POST',
      API_URL.ADD_PRODUCT_CHECKOUT_API,
      header,
    );
  };

  placeOrderCallback = {
    success: response => {
      console.log('from place order', response);
    },
    error: error => {
      console.log('error1', error);
    },
  };

  componentDidMount = async () => {
    await this.getData();

    await this.getProductData();

    await this.getTotalCost();
    await this.getCustAddress();

    setInterval(this.getProductData, 1500);
    setInterval(this.getTotalCost, 1500);
    setInterval(this.getCustAddress, 3000);
  };

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({
          token: value.token,
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
      let arr = JSON.parse(await AsyncStorage.getItem('cart'));

      if (arr !== null) {
        arr = arr.map(item => ({...item}));
        this.setState({cartData: arr});
        clearInterval(this.getProductData);
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
    const title = 'Time to choose!';
    const message = 'are u sure u wanna remove this item';
    const buttons = [
      {text: 'Cancel', type: 'cancel'},
      {
        text: 'yes',
        onPress: () => {
          this.remove_item(id);
        },
      },
    ];

    const dataFromCart = this.state.cartData;
    const index = dataFromCart.findIndex(result => {
      return result._id === id;
    });
    if (dataFromCart[index].quantity <= 1) {
      Alert.alert(title, message, buttons);
    } else if (dataFromCart[index].quantity > 1) {
      dataFromCart[index].quantity = dataFromCart[index].quantity - 1;

      await AsyncStorage.setItem('cart', JSON.stringify(dataFromCart));
      // this.setState({cartData: JSON.parse(AsyncStorage.getItem('cart'))});
    }
  };

  increaseQuantity = async id => {
    let dataFromCart = this.state.cartData;

    const index = dataFromCart.findIndex(result => {
      return result._id === id;
    });

    if (dataFromCart[index].quantity > 0) {
      dataFromCart[index].quantity = dataFromCart[index].quantity + 1;

      await AsyncStorage.setItem('cart', JSON.stringify(dataFromCart));
      //this.setState({cartData: AsyncStorage.getItem('cart')});
    }
  };

  getTotalCost = async () => {
    const {cartData} = this.state;
    let arr = cartData.map(item => {
      return item.product_cost * item.quantity;
    });

    let totalCost = arr.reduce((a, b) => a + b, 0);

    this.setState({totalOrder: totalCost});
  };

  removeFromList = id => {
    const title = 'Time to choose!';
    const message = 'are u sure u wanna remove this item';
    const buttons = [
      {text: 'Cancel', type: 'cancel'},
      {
        text: 'yes',
        onPress: () => {
          this.remove_item(id);
        },
      },
    ];
    Alert.alert(title, message, buttons);
  };

  remove_item = async id => {
    let data = this.state.cartData;

    let cart = data.filter(item => {
      return item._id !== id;
    });
    AsyncStorage.setItem('cart', JSON.stringify(cart));

    this.getProductData();

    alert('item has been successfully removed');
  };

  getCustAddress = () => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

    request(
      this.custAddressCallback,
      null,
      'GET',
      API_URL.GET_CUST_ADDRESS_API,
      header,
    );
  };

  custAddressCallback = {
    success: async response => {
      const a = response.customer_address.filter(i => {
        return i.isDeliveryAddress === true;
      });

      let address = a.map(s => {
        return s.address + ',' + s.pincode + ',' + s.country;
      });
      this.setState({custAddress: address});
    },
    error: error => {
      let empty = 'no address found please add address first';

      this.setState({custAddress: empty});
      console.log('errr', error);
    },
  };

  render() {
    const {customerData} = this.state;

    const userFullName = customerData.first_name + ' ' + customerData.last_name;

    return (
      <View style={{flex: 1}}>
        <View style={styles.userDetailContainer}>
          <View>
            <Text style={styles.userName}>{userFullName}</Text>
          </View>

          <View style={styles.userAddressContainer}>
            <Text style={styles.userAddress}>{this.state.custAddress}</Text>
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
              ListEmptyComponent={() => {
                return (
                  <View>
                    <Text style={{fontSize: 40, textAlign: 'center'}}>
                      no data found
                    </Text>
                  </View>
                );
              }}
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

                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                            }}>
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
                            <View style={styles.renderproductCostContainer}>
                              <Text style={styles.productCost}>
                                {'Rs' +
                                  ' ' +
                                  item.quantity * productItem.product_cost}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={styles.removeBTN}
                            onPress={() => {
                              this.removeFromList(item._id);
                            }}>
                            <Text style={styles.removeBTNText}>remove</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
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
                  <Text style={styles.productPrice}>
                    {'Rs.' + ' ' + this.state.totalOrder}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.moduleSeperatorline} />

          <View>
            <View style={styles.orderSummaryFooterContainer}>
              <View>
                <Text style={styles.productPrice}>
                  {'Rs.' + ' ' + this.state.totalOrder}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.orderNowBTN}
                onPress={() => {
                  this.orderNowHandler();
                }}>
                <Text style={styles.orderNowBTNtext}>ORDER NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default OrderSummary;

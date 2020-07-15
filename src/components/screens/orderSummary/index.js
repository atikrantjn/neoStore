import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import styles from './styles';
import ModalLoader from '../../custom/modalLoader/index';

import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL, API_URL, request, api} from '../../../config/api';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';

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
      isLoading: false,
      noAddressFound: false,

      total_cart_Price: 0,
      gst_price: 0,
    };
  }

  // function for ordernow button handler

  orderNowHandler = async () => {
    const title = 'Confirm!!';
    const message = 'Please confirm to place order';
    const buttons = [
      {text: 'Cancel', type: 'cancel'},
      {
        text: 'confirm',
        onPress: () => {
          if (this.state.noAddressFound === false) {
            this.placeOrder();
          } else {
            Alert.alert('Error', 'No shipping address found');
          }
        },
      },
    ];

    Alert.alert(title, message, buttons);
  };

  // function to call place order api

  placeOrder = () => {
    const {token} = this.state;

    let data = this.state.cartData;
    let flag = [{flag: 'checkout'}];
    let data1 = [...data, ...flag];

    this.setState({isLoading: true});

    api
      .fetchapi(
        'https://9db13fc36ac4.ngrok.io/addProductToCartCheckout',
        'post',
        JSON.stringify(data1),
        token,
      )

      .then(response => response.json())
      .then(async data => {
        if (data.success) {
          AsyncStorage.removeItem('cartData');

          this.setState({cartData: [], isLoading: false});
          await this.getTotalCost();

          Alert.alert(
            'Success',
            `Thank you for ordering products. ${data.message}`,
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.push('Admin');
                },
              },
            ],
          );
        } else {
          Alert.alert('Error', data.message);
        }
      });
  };

  componentDidMount = async () => {
    await this.getData();

    await this.getProductData();

    await this.getTotalCost();
    await this.getCustAddress();
  };

  // function to get user details from asyncstorage

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

  // function to get cart data from asyncstorage

  getProductData = async () => {
    try {
      let arr = JSON.parse(await AsyncStorage.getItem('cartData'));

      if (arr !== null) {
        arr = arr.map(item => ({...item}));
        this.setState({cartData: arr});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  FlatListItemSeparator = () => {
    return <View style={styles.renderitemSeperator} />;
  };

  // function to decrease quantity of product

  decreaseQuantity = async id => {
    const buttons = [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ];

    const dataFromCart = this.state.cartData;
    const index = dataFromCart.findIndex(result => {
      return result._id === id;
    });
    if (dataFromCart[index].quantity <= 1) {
      Alert.alert('Error!!', 'minimum limit is 1', buttons);
    } else if (dataFromCart[index].quantity > 1) {
      dataFromCart[index].quantity = dataFromCart[index].quantity - 1;

      await AsyncStorage.setItem('cartData', JSON.stringify(dataFromCart));
      await this.getTotalCost();

      this.setState({
        cartData: JSON.parse(await AsyncStorage.getItem('cartData')),
      });
    }
  };

  // function to increase quantity of product

  increaseQuantity = async id => {
    let dataFromCart = this.state.cartData;

    const index = dataFromCart.findIndex(result => {
      return result._id === id;
    });

    if (dataFromCart[index].quantity > 0) {
      dataFromCart[index].quantity = dataFromCart[index].quantity + 1;

      await AsyncStorage.setItem('cartData', JSON.stringify(dataFromCart));
      await this.getTotalCost();
      this.setState({
        cartData: JSON.parse(await AsyncStorage.getItem('cartData')),
      });
    }
  };

  // function to calculate total cost of product

  getTotalCost = async () => {
    const {cartData} = this.state;
    let arr = cartData.map(item => {
      return item.product_cost * item.quantity;
    });

    let totalCost = arr.reduce((a, b) => a + b, 0);

    let gst = parseInt(totalCost * 0.05);

    let totalOrder = parseInt(totalCost + parseInt(gst));

    this.setState({totalOrder, gst_price: gst, total_cart_Price: totalCost});
  };

  remove_from_list = id => {
    const title = 'Remove!!';
    const message = 'Are you sure you want to remove this item';
    const buttons = [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.remove_item(id);
        },
      },
    ];

    Alert.alert(title, message, buttons);
  };

  // function to remove item from list and from asyncstorage

  remove_item = async id => {
    let data = this.state.cartData;

    let cart = data.filter(item => {
      return item._id !== id;
    });
    AsyncStorage.setItem('cartData', JSON.stringify(cart));

    await this.getProductData();
    await this.getTotalCost();

    Alert.alert('success', 'Item has been successfully removed');
  };

  // function to get customer address from api

  getCustAddress = () => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

    this.setState({isLoading: true});

    request(
      this.custAddressCallback,
      null,
      'GET',
      API_URL.GET_CUST_ADDRESS_API,
      header,
    );
  };

  // callback from api of customer address

  custAddressCallback = {
    success: async response => {
      const a = response.customer_address.filter(i => {
        return i.isDeliveryAddress === true;
      });

      let address = a.map(s => {
        return s.address + ',' + s.pincode + ',' + s.country;
      });

      this.setState({
        custAddress: address,
        isLoading: false,
        noAddressFound: false,
      });
    },
    error: error => {
      let empty = error.message;
      this.setState({
        custAddress: empty,
        noAddressFound: true,
        isLoading: false,
      });
    },
  };

  componentDidUpdate = async prev => {
    if (this.props.route.params !== prev.route.params) {
      this.getCustAddress();
    }
  };

  render() {
    const {customerData} = this.state;

    const userFullName = customerData.first_name + ' ' + customerData.last_name;

    return (
      <View style={styles.mainContainer}>
        {this.state.isLoading ? (
          <ModalLoader isLoading={this.state.isLoading} />
        ) : null}

        <ScrollView style={{flex: 1}}>
          <View style={styles.userDetailContainer}>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{userFullName}</Text>
            </View>

            <View style={styles.userAddressContainer}>
              <Text style={styles.userAddress}>{this.state.custAddress}</Text>
            </View>
            <View style={styles.changeAddressBTNcontainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Add Address');
                }}>
                <View style={styles.changeAddressBTN}>
                  <Text style={styles.changeAddressBTNtext}>
                    Change Or Add Address
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.moduleSeperatorline} />

          <View style={styles.flatListMainContainer}>
            {this.state.cartData.length === 0 ? (
              <View style={styles.flatListEmptyContainer}>
                <Text style={styles.flatListEmptyText}>No data found</Text>
              </View>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={this.state.cartData}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                ListFooterComponent={this.FlatListItemSeparator}
                renderItem={({item}) => {
                  const productItem = JSON.parse(JSON.stringify(item));

                  return (
                    <View style={styles.rendercontainer}>
                      <View style={styles.renderFirstRowContainer}>
                        <Text style={styles.renderproductName}>
                          {productItem.product_id.product_name}
                        </Text>

                        <Image
                          style={styles.renderimageStyle}
                          source={{
                            uri:
                              BASE_URL + productItem.product_id.product_image,
                          }}
                        />
                      </View>

                      <View style={styles.renderSecondRowContainer}>
                        <Text style={styles.renderproductMaterial}>
                          {productItem.product_id.product_material}
                        </Text>

                        <View style={styles.renderproductCostContainer}>
                          <Text style={styles.productCost}>
                            {'Rs' +
                              ' ' +
                              item.quantity * productItem.product_cost}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.renderQuantity}>
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity>
                            <FaIcon
                              name={'minus'}
                              style={styles.minusBtn}
                              size={16}
                              onPress={() => {
                                const p_id = item._id;
                                this.decreaseQuantity(p_id);
                              }}
                            />
                          </TouchableOpacity>
                          <Text style={styles.quantityItemText}>
                            {item.quantity}
                          </Text>

                          <TouchableOpacity>
                            <FaIcon
                              style={styles.plusBtn}
                              name={'plus'}
                              size={16}
                              onPress={() => {
                                const p_id = item._id;
                                this.increaseQuantity(p_id);
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.removeBtnContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              const p_id = item._id;
                              this.remove_from_list(p_id);
                            }}>
                            <View style={styles.removeBTN}>
                              <Text style={styles.removeBTNText}>Remove</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>

          <View style={styles.footerContainer}>
            <View>
              <Text style={styles.footerPriceDetails}>Price Details</Text>
            </View>

            <View style={styles.productCostContainer}>
              <View>
                <Text style={styles.productPrice}>Price</Text>
              </View>
              <View>
                <Text style={styles.productPrice}>
                  {'Rs.' + ' ' + this.state.total_cart_Price}
                </Text>
              </View>
            </View>

            <View style={styles.moduleSeperatorline} />

            <View style={styles.gstCostContainer}>
              <View>
                <Text style={styles.productPrice}>gst(5% tax)</Text>
              </View>
              <View>
                <Text style={styles.productPrice}>
                  {'Rs.' + ' ' + this.state.gst_price}
                </Text>
              </View>
            </View>

            <View style={styles.moduleSeperatorline} />

            <View style={styles.subTotalCostContainer}>
              <View>
                <Text style={styles.productPrice}>Subtotal</Text>
              </View>
              <View>
                <Text style={styles.productPrice}>
                  {'Rs.' + ' ' + this.state.totalOrder}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.moduleSeperatorline} />
        </ScrollView>

        <View style={styles.orderSummaryFooterContainer}>
          <View>
            <Text style={styles.totalProductPrice}>Price</Text>
            <Text style={styles.totalProductPrice}>
              {'Rs.' + ' ' + this.state.totalOrder}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.orderNowHandler();
            }}>
            <View style={styles.orderNowBTN}>
              <Text style={styles.orderNowBTNtext}>ORDER NOW</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default OrderSummary;

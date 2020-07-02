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
import Loader from '../../custom/loaderComponent/loader';

import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL, API_URL, request, apiii} from '../../../config/api';

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
      isLoading: false,
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

    this.setState({isLoading: true});

    apiii
      .fetchapi(
        'http://180.149.241.208:3022/addProductToCartCheckout',
        'post',
        JSON.stringify(data1),
        token,
      )

      .then(response => response.json())
      .then(async data => {
        if (data.success) {
          this.setState({isLoading: false});

          Alert.alert(`Thank you for ordering products. ${data.message}`);
          AsyncStorage.removeItem('cartData');
          this.setState({cartData: []});
          this.props.navigation.navigate('My Orders');
        } else {
          Alert.alert(data.message);
        }
      });
  };

  componentDidMount = async () => {
    await this.getData();

    await this.getProductData();

    await this.getTotalCost();
    await this.getCustAddress();

    setInterval(this.getProductData, 1000);
    setInterval(this.getTotalCost, 1500);
    //setInterval(this.getCustAddress, 1000);
  };

  // componentWillUnmount = () => {
  //   clearInterval(this.getProductData);
  //   clearInterval(this.getTotalCost);
  // };

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

      await AsyncStorage.setItem('cartData', JSON.stringify(dataFromCart));
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

      await AsyncStorage.setItem('cartData', JSON.stringify(dataFromCart));
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
    AsyncStorage.setItem('cartData', JSON.stringify(cart));

    this.getProductData();

    Alert.alert('success', 'item has been successfully removed');
  };

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

  custAddressCallback = {
    success: async response => {
      const a = response.customer_address.filter(i => {
        return i.isDeliveryAddress === true;
      });

      let address = a.map(s => {
        return s.address + ',' + s.pincode + ',' + s.country;
      });
      this.setState({custAddress: address, isLoading: false});
    },
    error: error => {
      let empty = 'no address found please add address first';

      this.setState({custAddress: empty, isLoading: false});
    },
  };

  render() {
    const {customerData} = this.state;

    const userFullName = customerData.first_name + ' ' + customerData.last_name;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '100%',
        }}>
        {this.state.isLoading ? <Loader /> : null}
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

        <View style={{height: '50%'}}>
          {this.state.cartData.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 40, textAlign: 'center'}}>
                No data found
              </Text>
            </View>
          ) : (
            <FlatList
              data={this.state.cartData}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({item}) => {
                const productItem = JSON.parse(JSON.stringify(item));

                return (
                  <View style={styles.rendercontainer}>
                    <View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
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
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                      <View style={{paddingVertical: 12}}>
                        <Text style={styles.renderproductMaterial}>
                          {productItem.product_id.product_material}
                        </Text>
                      </View>

                      <View style={styles.renderproductCostContainer}>
                        <Text style={styles.productCost}>
                          {'Rs' +
                            ' ' +
                            item.quantity * productItem.product_cost}
                        </Text>
                      </View>
                    </View>

                    <View style={{width: '20%'}}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <TouchableOpacity style={styles.minusBtn}>
                          <FaIcon
                            name={'minus'}
                            size={20}
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
                          }}>
                          {item.quantity}
                        </Text>

                        <TouchableOpacity style={styles.plusBtn}>
                          <FaIcon
                            name={'plus'}
                            size={20}
                            onPress={() => {
                              const p_id = item._id;
                              this.increaseQuantity(p_id);
                            }}
                          />
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
        <View style={styles.moduleSeperatorline} />

        <View style={styles.orderSummaryFooterContainer}>
          <View>
            <Text style={styles.productPrice}>
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

import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../../config/api';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import moment from 'moment';
export class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',

      dItem: {},
      placedOrderDetails: [],
    };
  }
  componentDidMount = async () => {
    await this.getToken();
    this.getOrderDetails();
  };

  getToken = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({token: value.token});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  getOrderDetails = async () => {
    const {token} = this.state;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    request(
      this.getOrderDetailsCallback,
      null,
      'GET',
      API_URL.GET_ORDER_DETAILS_API,
      header,
    );
  };

  getOrderDetailsCallback = {
    success: response => {
      console.log(response, 'dhjhsdjhsd');
      this.setState({placedOrderDetails: response.product_details});
    },
    error: error => {
      console.log(error);
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
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.placedOrderDetails}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <FaIcon size={78} name="frown-open" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Oooopsssss data not found !!
                </Text>
              </View>
            );
          }}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => {
            let totalCost = item.product_details[0].total_cartCost;

            let date = item.product_details[0].createdAt;

            const orderDate = moment(date).format('MMMM D, YYYY');

            return (
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Order Id', {
                      orderData: item.product_details,
                    });
                  }}>
                  <View style={{flexDirection: 'column', marginTop: 10}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <Text
                        style={{
                          fontSize: 25,
                          marginHorizontal: 20,
                          fontWeight: 'bold',
                        }}>
                        Id : {item._id}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          marginHorizontal: 20,
                        }}>
                        {`Rs. ${totalCost}`}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', flex: 1}}>
                      <Text
                        style={{
                          fontSize: 20,
                          marginHorizontal: 20,
                          marginBottom: 5,
                        }}>
                        {`Order Date :  ${orderDate}`}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default OrderList;

import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../../config/api';
export class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      orderData: [],
      dItem: {},
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

  getOrderDetails = () => {
    const {token} = this.state;
    const data = null;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    request(
      this.cartCallBack,
      data,
      'GET',
      API_URL.GET_ORDER_DETAILS_API,
      header,
    );
  };

  cartCallBack = {
    success: response => {
      this.setState({orderData: response.product_details});
    },
    error: error => {
      console.log('errr', error);
    },
  };

  render() {
    const {orderData} = this.state;

    const result = orderData.map(item => {
      item.product_details.map(dItem => {
        const i1 = dItem.order_id;

        return i1;
      });
    });

    console.log(result);

    return (
      <View>
        <FlatList
          data={this.state.orderData}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    alert('hello');
                  }}>
                  <View>
                    <View style={{flexDirection: 'column'}}>
                      <Text numberOfLines={1}>{item.order_id}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default OrderList;

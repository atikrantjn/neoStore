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

  getOrderDetails = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('placeOrder'));

      if (value !== null) {
        console.log('placed', value);
        this.setState({
          orderData: value,
        });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  render() {
    const {orderData} = this.state;

    // const result = orderData.map(item => {
    //   item.product_details.map(dItem => {
    //     const i1 = dItem.order_id;

    //     return i1;
    //   });
    // });

    console.log(orderData);

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.orderData}
          renderItem={({item}) => {
            console.log(item);
            return (
              <View style={{flex: 1}}>
                {/* <TouchableOpacity
                  onPress={() => {
                    alert('hello');
                  }}>
                  <View>
                    <View style={{flexDirection: 'column'}}>
                      <Text numberOfLines={1}>{item.product_id}</Text>
                    </View>
                  </View>
                </TouchableOpacity> */}
                <Text>{item.product_cost}</Text>
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

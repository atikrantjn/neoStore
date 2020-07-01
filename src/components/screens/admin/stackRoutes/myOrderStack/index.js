import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import OrderList from '../../../myOrders/orderList/index';
import OrderId from '../../../myOrders/orderId/index';
const Stack = createStackNavigator();
class MyOrderStack extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="My Orders"
          component={OrderList}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },

            headerLeft: () => (
              <Ionicons
                name="md-arrow-back"
                size={28}
                color="white"
                style={{marginLeft: 10}}
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
              />
            ),

            headerTintColor: 'white',
            headerTitleAlign: 'center',

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 28,
            },
          }}
        />
        <Stack.Screen
          name="Order Id"
          component={OrderId}
          options={({route}) => ({
            title: route.params.order_id,
            headerStyle: {backgroundColor: appColors.themeColor},

            headerTintColor: 'white',
            headerTitleAlign: 'center',

            headerLeft: () => (
              <Ionicons
                name="md-arrow-back"
                size={28}
                color="white"
                style={{marginLeft: 10}}
                onPress={() => {
                  this.props.navigation.push('My Orders');
                }}
              />
            ),
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 28,
            },
          })}
        />
      </Stack.Navigator>
    );
  }
}

export default MyOrderStack;

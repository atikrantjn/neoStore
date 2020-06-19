import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
              <AntDesign
                name="back"
                size={28}
                color="white"
                style={{marginLeft: 10}}
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 30,
              marginHorizontal: 85,
            },
          }}
        />
        <Stack.Screen
          name="Order Id"
          component={OrderId}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerLeft: () => (
              <AntDesign
                name="back"
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

              fontSize: 30,
              marginHorizontal: 85,
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default MyOrderStack;

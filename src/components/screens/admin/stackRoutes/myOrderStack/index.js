import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import OrderList from '../../../myOrders/orderList/index';
import OrderId from '../../../myOrders/orderId/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  iconStyle: {marginLeft: 10},
});
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
                style={styles.iconStyle}
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

              fontSize: 26,
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

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 25,
            },
          })}
        />
      </Stack.Navigator>
    );
  }
}

export default MyOrderStack;

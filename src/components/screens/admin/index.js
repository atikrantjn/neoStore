import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './stackRoutes/homeStack';
import MyCart from './stackRoutes/myCartStack';
class Admin extends Component {
  constructor() {
    super();
  }

  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="My cart" component={MyCart} />
        {/* <Drawer.Screen name="tables" component={HomeScreen} />
        <Drawer.Screen name="sofas" component={NotificationsScreen} />
        <Drawer.Screen name="Chairs" component={HomeScreen} />
        <Drawer.Screen name="cupboards" component={NotificationsScreen} />
        <Drawer.Screen name="My account" component={HomeScreen} />
        <Drawer.Screen name="Store Locator" component={NotificationsScreen} />
        <Drawer.Screen name="My order" component={HomeScreen} />
        <Drawer.Screen name="Logout" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    );
  }
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
export default Admin;

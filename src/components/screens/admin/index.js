import React, {Component} from './node_modules/react';
import {View, Text, Button} from 'react-native';

import {createDrawerNavigator} from './node_modules/@react-navigation/drawer';
class Admin extends Component {
  constructor() {
    super();
  }

  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="My cart" component={NotificationsScreen} />
        <Drawer.Screen name="tables" component={HomeScreen} />
        <Drawer.Screen name="sofas" component={NotificationsScreen} />
        <Drawer.Screen name="Chairs" component={HomeScreen} />
        <Drawer.Screen name="cupboards" component={NotificationsScreen} />
        <Drawer.Screen name="My account" component={HomeScreen} />
        <Drawer.Screen name="Store Locator" component={NotificationsScreen} />
        <Drawer.Screen name="My order" component={HomeScreen} />
        <Drawer.Screen name="Logout" component={NotificationsScreen} />
      </Drawer.Navigator>
    );
  }
}

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Swipe right to open drawer</Text>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
export default Admin;

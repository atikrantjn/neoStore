import React, {Component} from 'react';
import appColors from '../../../utils/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './stackRoutes/homeStack';

import Sidebar from '../../custom/sidebarComponent/sidebar';
import ProductList from '../ProductList/ProductList';
class Admin extends Component {
  constructor() {
    super();
  }

  render() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
          width: 280,
          color: 'white',
        }}
        drawerType="slide"
        drawerContent={props => {
          return <Sidebar {...props} />;
        }}>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Bed" component={ProductList} />
        <Drawer.Screen name="Sofa" component={ProductList} />
        <Drawer.Screen name="Chair" component={ProductList} />
        <Drawer.Screen name="Table" component={ProductList} />
        <Drawer.Screen name="Almirah" component={ProductList} />
        {/* <Drawer.Screen name="Store Locator" component={MyCart} />
        <Drawer.Screen name="My order" component={HomeStack} />
        <Drawer.Screen name="Logout" component={MyCart} /> */}
      </Drawer.Navigator>
    );
  }
}

export default Admin;

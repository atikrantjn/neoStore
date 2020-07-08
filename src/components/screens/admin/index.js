import React, {Component} from 'react';
// import appColors from '../../../utils/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStack from './stackRoutes/homeStack';
import ProductDetails from '../productDetails/productDetails';
import Sidebar from '../../custom/sidebarComponent/sidebar';
import ProductList from '../ProductList/ProductList';
import MyCartStack from '../admin/stackRoutes/myCartStack/index';
import AddressStack from '../admin/stackRoutes/addressStack/index';
import userProfileStack from '../admin/stackRoutes/userProfileStack/index';
import StoreLocatorStack from '../admin/stackRoutes/storeLocatorStack/index';
import productListStack from '../admin/stackRoutes/productListStack/index';

import MyOrderStack from '../admin/stackRoutes/myOrderStack/index';

class Admin extends Component {
  constructor(props) {
    super(props);
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
        <Drawer.Screen name="Bed" component={productListStack} />
        <Drawer.Screen name="Sofa" component={productListStack} />
        <Drawer.Screen name="Chair" component={productListStack} />
        <Drawer.Screen name="Table" component={productListStack} />
        <Drawer.Screen name="Almirah" component={productListStack} />
        <Drawer.Screen name="ProductDetails" component={ProductDetails} />
        <Drawer.Screen name="MyCart" component={MyCartStack} />
        <Drawer.Screen name="Store Locator" component={StoreLocatorStack} />
        <Drawer.Screen name="Add Address" component={AddressStack} />
        <Drawer.Screen name="My Account" component={userProfileStack} />
        <Drawer.Screen name="Order Id" component={MyOrderStack} />
        <Drawer.Screen name="My Orders" component={MyOrderStack} />
      </Drawer.Navigator>
    );
  }
}

export default Admin;

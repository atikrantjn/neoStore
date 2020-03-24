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
class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Drawer = createDrawerNavigator();

    console.log('shdgfjhgdf', this.props);
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
        <Drawer.Screen name="ProductDetails" component={ProductDetails} />
        <Drawer.Screen name="MyCart" component={MyCartStack} />
        <Drawer.Screen name="Store Locator" component={StoreLocatorStack} />
        <Drawer.Screen name="Add Address" component={AddressStack} />
        <Drawer.Screen name="My Account" component={userProfileStack} />
      </Drawer.Navigator>
    );
  }
}

export default Admin;

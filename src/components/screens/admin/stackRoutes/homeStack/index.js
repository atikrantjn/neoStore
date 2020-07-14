import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../home';
import appColors from '../../../../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import ProductList from '../../../ProductList/ProductList';
import ProductDetails from '../../../productDetails/productDetails';
import OrderSummary from '../../../orderSummary/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddAddress from '../../../admin/userAddress/addAddress';
import AddressList from '../../../admin/userAddress/addressList';

const styles = StyleSheet.create({
  iconStyle: {marginRight: 10},
  iconStyle_2: {marginLeft: 10},
});

const Stack = createStackNavigator();
class HomeStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="NeoSTORE"
          component={Home}
          title="NeoSTORE"
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerRight: () => (
              <TouchableOpacity>
                <Icon
                  name="search"
                  size={28}
                  color="white"
                  style={styles.iconStyle}
                  onPress={() => {
                    this.props.navigation.navigate('SearchBar');
                  }}
                />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <FontAwesomeIcon
                name="bars"
                size={28}
                color="white"
                style={styles.iconStyle_2}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 28,
            },
          }}
        />

        <Stack.Screen
          name="Bed"
          component={ProductList}
          options={({route}) => ({
            title: route.params.product_name,
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerRight: () => (
              <Icon
                onPress={() => {
                  this.props.navigation.navigate('SearchBar');
                }}
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 28,
            },
          })}
        />

        <Stack.Screen
          name="Sofa"
          component={ProductList}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.navigate('SearchBar');
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 30,
            },
          }}
        />

        <Stack.Screen
          name="Table"
          component={ProductList}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',

            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.navigate('SearchBar');
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 30,
            },
          }}
        />

        <Stack.Screen
          name="Chair"
          component={ProductList}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.navigate('SearchBar');
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 30,
            },
          }}
        />

        <Stack.Screen
          name="Almirah"
          component={ProductList}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.navigate('SearchBar');
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              fontSize: 30,
            },
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={({route}) => ({
            title: route.params.product_name,

            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 24,
              marginHorizontal: 45,
            },
          })}
        />
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummary}
          options={{
            title: 'Order Summary',
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="Add Address"
          component={AddAddress}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },

            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="Address List"
          component={AddressList}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',

            headerRight: () => (
              <AntDesign
                name="plus"
                size={30}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.push('Add Address');
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeStack;

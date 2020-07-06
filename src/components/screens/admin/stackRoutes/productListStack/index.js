import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import appColors from '../../../../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProductList from '../../../ProductList/ProductList';
import ProductDetails from '../../../productDetails/productDetails';
import Home from '../../home/index';

const Stack = createStackNavigator();
class ProductListStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Bed"
          component={ProductList}
          options={({route}) => ({
            // title: route.params.product_name,
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
                style={{marginRight: 10}}
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
                style={{marginRight: 10}}
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
                style={{marginRight: 10}}
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
                style={{marginRight: 10}}
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
                style={{marginRight: 10}}
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
                  style={{marginRight: 10}}
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
                style={{marginLeft: 10}}
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
          name="ProductDetails"
          component={ProductDetails}
          options={{
            title: 'product details',
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 28,
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default ProductListStack;

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import appColors from '../../../../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ProductList from '../../../ProductList/ProductList';
import ProductDetails from '../../../productDetails/productDetails';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  iconStyle: {marginLeft: 10},
  iconStyle_2: {marginRight: 10},
});

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
          initialParams={{id: this.props.route.params.id}}
          options={({route}) => ({
            title: this.props.route.params.categoryName,
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <FontAwesomeIcon
                name="bars"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => (
              <Icon
                onPress={() => {
                  this.props.navigation.navigate('SearchBar');
                }}
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle_2}
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
          options={({route}) => ({
            title: this.props.route.params.categoryName,

            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <FontAwesomeIcon
                name="bars"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle_2}
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
          })}
        />

        <Stack.Screen
          name="Table"
          title="Table"
          component={ProductList}
          options={({route}) => ({
            title: this.props.route.params.categoryName,

            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <FontAwesomeIcon
                name="bars"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),

            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle_2}
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
          })}
        />

        <Stack.Screen
          name="Chair"
          title="Chair"
          component={ProductList}
          options={({route}) => ({
            title: this.props.route.params.categoryName,

            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <FontAwesomeIcon
                name="bars"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle_2}
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
          })}
        />

        <Stack.Screen
          name="Almirah"
          title="Almirah"
          component={ProductList}
          options={({route}) => ({
            title: this.props.route.params.categoryName,

            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
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
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={styles.iconStyle_2}
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
          })}
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
      </Stack.Navigator>
    );
  }
}

export default ProductListStack;

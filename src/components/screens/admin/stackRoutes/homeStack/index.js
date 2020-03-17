import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../home';
import appColors from '../../../../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import ProductList from '../../../ProductList/ProductList';
import ProductDetails from '../../../productDetails/productDetails';
const Stack = createStackNavigator();
class HomeStack extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="NeoSTORE"
          component={Home}
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
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 30,
              marginHorizontal: 85,
            },
          }}
        />

        <Stack.Screen
          name="Bed"
          component={ProductList}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={{marginRight: 10}}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 30,
              marginHorizontal: 85,
            },
          }}
        />

        <Stack.Screen
          name="Sofa"
          component={ProductList}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={{marginRight: 10}}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 30,
              marginHorizontal: 85,
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
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={{marginRight: 10}}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 30,
              marginHorizontal: 85,
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
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={{marginRight: 10}}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 30,
              marginHorizontal: 85,
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
            headerRight: () => (
              <Icon
                name="search"
                size={28}
                color="white"
                style={{marginRight: 10}}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 30,
              marginHorizontal: 85,
            },
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeStack;

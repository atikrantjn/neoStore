import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AddAddress from '../../userAddress/addAddress';
import AddressList from '../../userAddress/addressList';
const Stack = createStackNavigator();
class AddressStack extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Add Address"
          component={AddAddress}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerLeft: () => (
              <AntDesign
                name="back"
                size={28}
                color="white"
                style={{marginLeft: 10}}
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 30,
              marginHorizontal: 85,
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
            headerLeft: () => (
              <AntDesign
                name="back"
                size={28}
                color="white"
                style={{marginLeft: 10}}
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
              />
            ),

            headerRight: () => (
              <AntDesign
                name="plus"
                size={30}
                color="white"
                style={{marginRight: 10}}
                onPress={() => {
                  this.props.navigation.push('Add Address');
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 30,
              marginHorizontal: 85,
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default AddressStack;

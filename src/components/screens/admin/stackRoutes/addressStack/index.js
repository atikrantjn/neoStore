import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AddAddress from '../../userAddress/addAddress';
import AddressList from '../../userAddress/addressList';

const styles = StyleSheet.create({
  barIconStyle: {marginLeft: 10},

  plusIconStyle: {marginRight: 10},
});
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
              <FontAwesomeIcon
                name="bars"
                size={28}
                color="white"
                style={styles.barIconStyle}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
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
                style={styles.plusIconStyle}
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

export default AddressStack;

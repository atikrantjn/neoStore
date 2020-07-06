import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import MyAccount from '../../userProfile/myAccount/index';
import EditProfile from '../../userProfile/editProfile/index';
import ResetPassword from '../../userProfile/resetPassword/index';

const Stack = createStackNavigator();
class userProfileStack extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="My Account"
          component={MyAccount}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <FaIcon
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

              fontSize: 28,
            },
          }}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EditProfile}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 28,
            },
          }}
        />

        <Stack.Screen
          name="Reset Password"
          component={ResetPassword}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },

            headerTintColor: 'white',
            headerTitleAlign: 'center',

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 28,
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default userProfileStack;

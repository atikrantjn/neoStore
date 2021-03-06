import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import {StyleSheet} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import MyAccount from '../../userProfile/myAccount/index';
import EditProfile from '../../userProfile/editProfile/index';
import ResetPassword from '../../userProfile/resetPassword/index';

const styles = StyleSheet.create({
  iconStyle: {marginLeft: 10},
});

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
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 24,
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

              fontSize: 24,
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

              fontSize: 24,
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default userProfileStack;

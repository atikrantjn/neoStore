import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
          name="Edit Profile"
          component={EditProfile}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },

            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',

              fontSize: 30,
              marginHorizontal: 85,
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

export default userProfileStack;

// import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import React, {Component} from 'react';
import configureStore from './src/redux/configureStore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import appColors from './src/utils/colors';
import Login from './src/components/screens/login/index';
import Welcome from './src/components/screens/welcome/index';
import Register from './src/components/screens/register/index';
import Admin from './src/components/screens/admin';
import SearchBarHeader from './src/components/screens/searchbar/index';

import ForgotPassword from './src/components/screens/forgotPassword/index';
import SetPassword from './src/components/screens/setPassword/index';

const store = configureStore();
const Stack = createStackNavigator();
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
    };
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerStyle: {
                  backgroundColor: appColors.themeColor,
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: 'white',
                  fontWeight: 'bold',

                  fontSize: 26,
                },
              }}
            />
            <Stack.Screen
              name="Forgot Password"
              component={ForgotPassword}
              options={{
                headerStyle: {
                  backgroundColor: appColors.themeColor,
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: 'white',
                  fontWeight: 'bold',

                  fontSize: 26,
                },
              }}
            />
            <Stack.Screen
              name="Set Password"
              component={SetPassword}
              options={{
                headerStyle: {
                  backgroundColor: appColors.themeColor,
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: 'white',
                  fontWeight: 'bold',

                  fontSize: 26,
                },
              }}
            />
            <Stack.Screen
              name="Admin"
              component={Admin}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SearchBar"
              component={SearchBarHeader}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

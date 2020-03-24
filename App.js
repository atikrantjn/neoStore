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

import ForgotPassword from './src/components/screens/forgotPassword/index';
import SetPassword from './src/components/screens/setPassword/index';
import {AsyncStorage} from '@react-native-community/async-storage';

const store = configureStore();
const Stack = createStackNavigator();
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log('available', value);
      if (value !== null) {
        // value previously stored
        this.setState({userToken: value});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

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
                headerTitleStyle: {
                  fontWeight: 'bold',
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
                headerTitleStyle: {
                  fontWeight: 'bold',
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
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Admin"
              component={Admin}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

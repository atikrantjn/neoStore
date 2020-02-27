// import 'react-native-gesture-handler';
import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/components/screens/login/index';
import Welcome from './src/components/screens/welcome/index';
import Register from './src/components/screens/register/index';
import Admin from './src/components/screens/admin';
const Stack = createStackNavigator();
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Admin"
            component={Admin}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

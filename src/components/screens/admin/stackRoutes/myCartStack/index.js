import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

import MyCart from '../../myCart/index';
const Stack = createStackNavigator();
class MyCartStack extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="My Cart"
          component={MyCart}
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
      </Stack.Navigator>
    );
  }
}

export default MyCartStack;

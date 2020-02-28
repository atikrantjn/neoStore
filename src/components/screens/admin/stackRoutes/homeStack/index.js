import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../home';
import appColors from '../../../../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
class HomeStack extends Component {
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
              <Icon
                name="search"
                size={28}
                color="white"
                style={{marginRight: 10}}
              />
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
            },
          }}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeStack;

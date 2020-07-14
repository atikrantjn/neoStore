import React, {Component} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import appColors from '../../../../../utils/colors';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import MyCart from '../../myCart/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  iconStyle: {marginLeft: 10},
});
const Stack = createStackNavigator();
class MyCartStack extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="My cart"
          component={MyCart}
          options={{
            headerStyle: {
              backgroundColor: appColors.themeColor,
            },
            headerLeft: () => (
              <FontAwesomeIcon
                name="bars"
                size={28}
                color="white"
                style={styles.iconStyle}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              />
            ),
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

export default MyCartStack;

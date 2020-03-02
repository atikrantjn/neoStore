import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import styles from './styles';

import Icon from 'react-native-vector-icons/FontAwesome5';
const screenWidth = Math.round(Dimensions.get('window').width);
export class SetPassword extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>

        <View style={{marginLeft: 50}}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>

            <TextInput
              style={styles.input}
              placeholder="new password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>

            <TextInput
              style={styles.input}
              placeholder="Re-enter password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={styles.customBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SetPassword;

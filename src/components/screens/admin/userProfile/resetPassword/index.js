import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles';

export class ResetPassword extends Component {
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
              placeholder="Current Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>

            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                alert('hello');
              }}>
              <Text style={styles.customBtnText}>RESET PASSWORD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ResetPassword;

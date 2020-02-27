import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {CheckBox} from 'native-base';

import RadioForm from 'react-native-simple-radio-button';
import styles from './styles';

class Register extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let gender = [
      {label: 'Male', value: 0},
      {label: 'Female', value: 1},
    ];
    return (
      <View style={styles.container}>
        <View style={styles.registerContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>
        <View>
          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View style={styles.radioButtonContainer}>
            <Text style={styles.genderText}>Gender</Text>
            <RadioForm
              radio_props={gender}
              initial={1}
              buttonSize={20}
              buttonOuterSize={30}
              selectedButtonColor="white"
              selectedLabelColor="white"
              labelStyle={{fontSize: 20, marginTop: 5, color: 'white'}}
              formHorizontal={true}
              radioStyle={{paddingRight: 20}}
              disable={true}
            />
          </View>
          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View style={styles.registerInput}></View>
        </View>
      </View>
    );
  }
}

export default Register;

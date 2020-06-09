import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../../../config/api';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newpass: '',
      pass: '',
      confirmPass: '',

      token: '',

      passwordErr: false,
      confirmPasswordErr: false,
      newpassErr: false,
    };
  }

  changePasswordHandler = () => {
    const {pass, newpass, confirmPass} = this.state;
    if (pass === '' || newpass === '' || confirmPass === '') {
      Alert.alert('fields cannot be kept empty');
      return false;
    } else {
      this.sendPassword();
    }
  };

  sendPassword = () => {
    const postData = {
      oldPass: this.state.pass,
      newPass: this.state.newpass,
      confirmPass: this.state.confirmPass,
    };
    const {token} = this.state;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    request(
      this.changePassCallback,
      postData,
      'POST',
      API_URL.CHANGE_PASSWORD_API,
      header,
    );
  };

  //callback of change password api

  changePassCallback = {
    success: response => {
      Alert.alert(response.message);
      this.props.navigation.navigate('My Account');
    },
    error: error => {
      console.log('in change password err ', error);
    },
  };

  validatePassword = pass => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;

    if (passPattern.test(pass) === false) {
      this.setState({passwordErr: true});
      return false;
    } else {
      this.setState({pass: pass, passwordErr: false});
    }
  };

  validateNewPassword = newpass => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;

    if (passPattern.test(newpass) === false) {
      this.setState({newpassErr: true});
      return false;
    } else {
      this.setState({newpass: newpass, newpassErr: false});
    }
  };

  validateConfPass = confirmPass => {
    let passv = this.state.newpass;

    if (!confirmPass.match(passv)) {
      this.setState({confirmPasswordErr: true});
      return false;
    } else {
      this.setState({
        confirmPass: confirmPass,
        confirmPasswordErr: false,
      });
    }
  };

  //get token from asyncstorage

  getToken = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({token: value.token});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  componentDidMount = async () => {
    await this.getToken();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>

        <View style={{marginLeft: 50}}>
          <View>
            <FaIcon
              name="lock"
              size={25}
              style={{
                position: 'absolute',
                top: 12,
                left: 10,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              secureTextEntry
              onChangeText={pass => this.validatePassword(pass)}
            />

            {this.state.passwordErr ? (
              <Text style={{color: 'white'}}>
                *Password must be 8-15 alphanumeric characters
              </Text>
            ) : null}
          </View>
          <View>
            <FaIcon
              name="lock"
              size={25}
              style={{
                position: 'absolute',
                top: 12,
                left: 10,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              secureTextEntry
              onChangeText={newpass => this.validateNewPassword(newpass)}
            />

            {this.state.newpassErr ? (
              <Text style={{color: 'white'}}>
                *Password must be 8-15 alphanumeric characters
              </Text>
            ) : null}
          </View>
          <View>
            <FaIcon
              name="lock"
              size={25}
              style={{
                position: 'absolute',
                top: 12,
                left: 10,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="white"
              secureTextEntry
              onChangeText={confirmPass => {
                this.validateConfPass(confirmPass);
              }}
              underlineColorAndroid="transparent"
            />
            {this.state.confirmPasswordErr ? (
              <Text style={{color: 'white'}}>Password did'nt matched!!</Text>
            ) : null}
          </View>
          <View>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.changePasswordHandler();
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

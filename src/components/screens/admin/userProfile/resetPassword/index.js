import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../../../config/api';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../../../custom/loaderComponent/loader';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newpass: '',
      pass: '',
      confirmPass: '',

      token: '',

      passwordErr: '',
      confirmPasswordErr: '',
      newpassErr: '',

      hidePassword: true,
      isLoading: false,
    };
  }

  setPasswordVisibility = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  changePasswordHandler = () => {
    let password = this.validatePassword();
    let newpassword = this.validateNewPassword();
    let confirmpassword = this.validateConfPass();

    if (password && newpassword && confirmpassword) {
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

    this.setState({isLoading: true});

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
      this.setState({
        newpass: '',
        pass: '',
        confirmPass: '',
        isLoading: false,
      });

      Alert.alert(
        'Success',
        response.message,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('My Account');
            },
          },
        ],
        {cancelable: false},
      );
    },
    error: error => {
      this.setState({isLoading: false});
      Alert.alert(
        'Error',
        error.message,
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    },
  };

  validatePassword = () => {
    if (this.state.pass === '') {
      this.setState({
        passwordErr: '*fields cannot be kept blank',
      });
      return false;
    } else if (this.state.pass.length < 8 || this.state.pass.length > 15) {
      this.setState({
        passwordErr: '*Password must be 8-15 alphanumeric characters',
      });
      return false;
    } else {
      this.setState({passwordErr: ''});
      return true;
    }
  };

  validateNewPassword = () => {
    if (this.state.newpass === '') {
      this.setState({
        newpassErr: '*fields cannot be kept blank',
      });
      return false;
    } else if (
      this.state.newpass.length < 8 ||
      this.state.newpass.length > 15
    ) {
      this.setState({
        passwordErr: '*Password must be 8-15 alphanumeric characters',
      });
      return false;
    } else {
      this.setState({newpassErr: ''});
      return true;
    }
  };

  validateConfPass = () => {
    let passv = this.state.newpass;
    if (this.state.confirmPass === '') {
      this.setState({
        confirmPasswordErr: '*fields cannot be kept blank',
      });
      return false;
    } else if (!this.state.confirmPass.match(passv)) {
      this.setState({confirmPasswordErr: 'password not matched'});
      return false;
    } else {
      this.setState({
        confirmPasswordErr: '',
      });
      return true;
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

        {this.state.isLoading ? <Loader /> : null}

        <View style={{flex: 1}}>
          <View style={styles.registerInput}>
            <FaIcon
              name="lock"
              size={22}
              style={{
                position: 'absolute',
                top: 12,
                left: 20,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              secureTextEntry={this.state.hidePassword}
              onChangeText={pass =>
                this.setState(
                  {
                    pass: pass,
                  },
                  () => {
                    this.validatePassword();
                  },
                )
              }
            />
            <FaIcon
              name={this.state.hidePassword ? 'eye' : 'eye-slash'}
              size={24}
              style={{
                position: 'absolute',
                top: 12,
                right: 20,
                color: 'white',
              }}
              onPress={() => {
                this.setPasswordVisibility();
              }}
            />

            {this.state.passwordErr ? (
              <Text style={{color: 'white'}}>{this.state.passwordErr}</Text>
            ) : null}
          </View>
          <View style={styles.registerInput}>
            <FaIcon
              name="lock"
              size={22}
              style={{
                position: 'absolute',
                top: 12,
                left: 20,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              secureTextEntry={this.state.hidePassword}
              onChangeText={newpass =>
                this.setState(
                  {
                    newpass: newpass,
                  },
                  () => {
                    this.validateNewPassword();
                  },
                )
              }
            />
            <FaIcon
              name={this.state.hidePassword ? 'eye' : 'eye-slash'}
              size={24}
              style={{
                position: 'absolute',
                top: 12,
                right: 20,
                color: 'white',
              }}
              onPress={() => {
                this.setPasswordVisibility();
              }}
            />
            {this.state.newpassErr ? (
              <Text style={{color: 'white'}}>{this.state.newpassErr}</Text>
            ) : null}
          </View>
          <View style={styles.registerInput}>
            <FaIcon
              name="lock"
              size={22}
              style={{
                position: 'absolute',
                top: 12,
                left: 20,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="white"
              secureTextEntry={this.state.hidePassword}
              onChangeText={confirm =>
                this.setState(
                  {
                    confirmPass: confirm,
                  },
                  () => {
                    this.validateConfPass();
                  },
                )
              }
            />
            <FaIcon
              name={this.state.hidePassword ? 'eye' : 'eye-slash'}
              size={24}
              style={{
                position: 'absolute',
                top: 12,
                right: 20,
                color: 'white',
              }}
              onPress={() => {
                this.setPasswordVisibility();
              }}
            />
            {this.state.confirmPasswordErr ? (
              <Text style={{color: 'white'}}>
                {this.state.confirmPasswordErr}
              </Text>
            ) : null}
          </View>
          <View style={{marginHorizontal: 50, marginBottom: 10}}>
            <TouchableOpacity
              onPress={() => {
                this.changePasswordHandler();
              }}>
              <View style={styles.customBtnBG}>
                <Text style={styles.customBtnText}>RESET PASSWORD</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ResetPassword;

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Alert} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../config/api';
import EnIcon from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import ModalLoader from '../../custom/modalLoader/index';

export class SetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPass: '',
      confirmPass: '',
      otpCode: '',

      confirmPasswordErr: '',
      newpassErr: '',
      otpError: '',
      data: {},

      isLoading: false,
    };
  }

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('forgotPassData'));

      if (value !== null) {
        this.setState({data: value});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  // function to validate user password

  validatePassword = () => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;
    if (this.state.newPass === '') {
      this.setState({newpassErr: 'cannot be kept blank'});
      return false;
    } else if (!passPattern.test(this.state.newPass)) {
      this.setState({
        newpassErr: 'Password must be 8-15 alphanumeric characters',
      });
      return false;
    } else {
      this.setState({newpassErr: ''});
      return true;
    }
  };

  // function to validate confirm password

  validateConfPass = () => {
    if (this.state.confirmPass === '') {
      this.setState({confirmPasswordErr: 'cannot be kept blank'});
      return false;
    } else if (!this.state.confirmPass.match(this.state.newPass)) {
      this.setState({confirmPasswordErr: 'Password didnt matched!!'});
      return false;
    } else {
      this.setState({
        confirmPasswordErr: '',
      });
      return true;
    }
  };

  // function to validate otp

  validateOtp = () => {
    if (this.state.otpCode === '') {
      this.setState({otpError: 'cannot be kept blank'});
      return false;
    } else {
      this.setState({otpError: ''});
      return true;
    }
  };

  componentDidMount = async () => {
    await this.getData();
  };

  // function to validate user input fields

  setPasswordHandler = () => {
    let otp = this.validateOtp();
    let userpass = this.validatePassword();
    let userconfpass = this.validateConfPass();

    if (otp && userpass && userconfpass) {
      this.setState({isLoading: true});
      this.sendData();
    }
  };

  // function to send data to api

  sendData = () => {
    const postData = {
      otpCode: this.state.otpCode,
      newPass: this.state.newPass,
      confirmPass: this.state.confirmPass,
    };
    const {token} = this.state.data;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    request(
      this.setPassCallback,
      postData,
      'POST',
      API_URL.SET_PASSWORD_API,
      header,
    );
  };

  // callback from api

  setPassCallback = {
    success: response => {
      this.setState({isLoading: false});
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
              this.props.navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    },
    error: error => {
      this.setState({
        newPass: '',
        confirmPass: '',
        otpCode: '',
        isLoading: false,
      });
      Alert.alert('Error', error.message);
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>

        {this.state.isLoading ? (
          <ModalLoader isLoading={this.state.isLoading} />
        ) : null}

        <View style={styles.inputContainerStyle}>
          <View style={styles.inputView}>
            <EnIcon name="dial-pad" size={28} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Otp"
              placeholderTextColor="white"
              keyboardType="number-pad"
              underlineColorAndroid="transparent"
              onChangeText={otpCode => {
                this.setState({otpCode}, () => {
                  this.validateOtp();
                });
              }}
            />
          </View>
          {this.state.otpError ? (
            <Text style={styles.errorTextStyle}>{this.state.otpError}</Text>
          ) : null}

          <View style={styles.inputView}>
            <FaIcon name="lock" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="New password"
              placeholderTextColor="white"
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={newPass => {
                this.setState({newPass}, () => {
                  this.validatePassword();
                });
              }}
            />
          </View>

          {this.state.newpassErr ? (
            <Text style={styles.errorTextStyle}>{this.state.newpassErr}</Text>
          ) : null}
          <View style={styles.inputView}>
            <FaIcon name="lock" size={25} style={styles.iconStyle} />

            <TextInput
              style={styles.input}
              placeholder="Re-enter password"
              placeholderTextColor="white"
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={confirmPass => {
                this.setState({confirmPass}, () => {
                  this.validateConfPass();
                });
              }}
            />
          </View>

          {this.state.confirmPasswordErr ? (
            <Text style={styles.errorTextStyle}>
              {this.state.confirmPasswordErr}
            </Text>
          ) : null}

          <View>
            <TouchableOpacity
              onPress={() => {
                this.setPasswordHandler();
              }}>
              <View style={styles.customBtnBG}>
                <Text style={styles.customBtnText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SetPassword;

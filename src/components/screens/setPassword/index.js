import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../config/api';
import EnIcon from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Math.round(Dimensions.get('window').width);
export class SetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPass: '',
      confirmPass: '',
      otpCode: null,

      confirmPasswordErr: false,
      newpassErr: false,
      data: {},
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

  validateNewPassword = newPass => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;

    if (passPattern.test(newPass) === false) {
      this.setState({newpassErr: true});
      return false;
    } else {
      this.setState({newPass: newPass, newpassErr: false});
    }
  };

  validateConfPass = confirmPass => {
    let passv = this.state.newPass;

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

  componentDidMount = async () => {
    await this.getData();
  };

  setPasswordHandler = () => {
    const {newPass, confirmPass, otpCode} = this.state;
    if (otpCode === '' || newPass === '' || confirmPass === '') {
      Alert.alert('fields cannot be kept empty');
    } else {
      this.sendData();
    }
  };

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

  setPassCallback = {
    success: response => {
      Alert.alert(response.message);
      this.props.navigation.navigate('Login');
    },
    error: error => {
      Alert.alert('something went wrong');
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>

        <View style={{marginLeft: 50}}>
          <View>
            <View>
              <EnIcon
                name="dial-pad"
                size={28}
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 10,
                  color: 'white',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="otp"
                placeholderTextColor="white"
                keyboardType="number-pad"
                underlineColorAndroid="transparent"
                onChangeText={otpCode =>
                  this.setState({
                    otpCode: otpCode,
                  })
                }></TextInput>
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
                placeholder="new password"
                placeholderTextColor="white"
                secureTextEntry
                underlineColorAndroid="transparent"
                onChangeText={newpass =>
                  this.validateNewPassword(newpass)
                }></TextInput>
            </View>

            {this.state.newpassErr ? (
              <Text style={{color: 'white'}}>
                *Password must be 8-15 alphanumeric characters
              </Text>
            ) : null}
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
                placeholder="Re-enter password"
                placeholderTextColor="white"
                secureTextEntry
                underlineColorAndroid="transparent"
                onChangeText={confirmPass => {
                  this.validateConfPass(confirmPass);
                }}></TextInput>
            </View>

            {this.state.confirmPasswordErr ? (
              <Text style={{color: 'white'}}>Password did'nt matched!!</Text>
            ) : null}
          </View>
          <View>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.setPasswordHandler();
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

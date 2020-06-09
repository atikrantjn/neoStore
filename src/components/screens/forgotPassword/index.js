import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
import {InputGroup, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../config/api';

const screenWidth = Math.round(Dimensions.get('window').width);
export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErr: false,
      showAlert: false,
      token: '',
    };
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  emailValidation = email => {
    let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;

    if (pattern.test(email) === false) {
      this.setState({emailErr: true});
    } else {
      this.setState({email: email, emailErr: false});
    }
  };

  forgotPassHandler = () => {
    console.log('hello');
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const {email} = this.state;
    const data = {
      email: this.state.email,
    };
    if (email === '') {
      alert('fields cannot be kept empty');
    } else if (this.state.emailErr === false) {
      request(
        this.forgotPasscallback,
        data,
        'POST',
        API_URL.FORGOT_PASS_API,
        header,
      );
    } else {
      alert('oops somethimg went wrong');
    }
  };

  forgotPasscallback = {
    success: response => {
      console.log('resp', response);
      this.showAlert();
      this.storeData(response);

      setTimeout(() => {
        this.props.navigation.navigate('Set Password');
        this.hideAlert();
      }, 3000);
    },
    error: error => {
      alert('this email is not registered with us');
    },
  };

  storeData = async response => {
    try {
      await AsyncStorage.setItem('forgotPassData', JSON.stringify(response));
    } catch (e) {
      // saving error
      console.log('error in storing data', e);
    }
  };
  render() {
    console.log(this.state.token);
    const {showAlert} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>
        <View style={{marginLeft: 50}}>
          <View>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>
          <View style={styles.forgotInput}>
            <InputGroup
              style={{
                marginVertical: 45,
                borderBottomWidth: 1,
                borderColor: 'white',
                width: screenWidth - 100,
              }}>
              <Icon
                name={'user'}
                size={27}
                color={'white'}
                style={{marginRight: 40}}
              />
              <Input
                placeholder="enter email"
                placeholderTextColor="white"
                style={styles.input}
                onChangeText={email => {
                  this.emailValidation(email);
                }}
              />
            </InputGroup>
            {this.state.emailErr ? (
              <Text style={{color: 'white'}}>invalid email address</Text>
            ) : null}
          </View>
          <View style={styles.loginInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.forgotPassHandler();
              }}>
              <Text style={styles.customBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <AwesomeAlert
          show={showAlert}
          title="forgot password"
          message="check email for further instructions"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          messageStyle={{color: 'green', fontSize: 18}}
          contentContainerStyle={{width: 350, height: 120}}
        />
      </View>
    );
  }
}

export default ForgotPassword;

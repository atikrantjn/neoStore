import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
import {InputGroup, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_URL, request} from '../../../config/api';
const screenWidth = Math.round(Dimensions.get('window').width);
export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErr: false,
    };
  }

  emailValidation = email => {
    // console.log('xyz', email);
    let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;

    if (pattern.test(email) === false) {
      this.setState({emailErr: true});
    } else {
      this.setState({email: email, emailErr: false});
    }
  };

  forgotPassHandler = () => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const {email} = this.state;
    const data = this.state.email;
    if (email === '') {
      alert('fields cannot be kept empty');
    } else {
      request(
        this.forgotPasscallback,
        data,
        'POST',
        API_URL.FORGOT_PASS_API,
        header,
      );
    }
  };

  forgotPasscallback = {
    success: response => {
      console.log('response forgot', response);
    },
    error: error => {
      console.log('response err', error);
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
      </View>
    );
  }
}

export default ForgotPassword;

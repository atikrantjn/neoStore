import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import styles from './styles';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../config/api';
import Loader from '../../custom/loaderComponent/loader';

const screenWidth = Math.round(Dimensions.get('window').width);
export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErr: '',
      showAlert: false,
      token: '',
      isLoading: false,
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

  // function to validate email address

  validateEmail = () => {
    let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
    if (this.state.email === '') {
      this.setState({emailErr: 'cannot be kept blank'});
      return false;
    } else if (!pattern.test(this.state.email)) {
      this.setState({emailErr: 'invalid email address'});
      return false;
    } else {
      this.setState({emailErr: ''});
      return true;
    }
  };

  // forgot password api call function

  forgotPassHandler = () => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    let useremail = this.validateEmail();
    const data = {
      email: this.state.email,
    };
    if (useremail) {
      this.setState({isLoading: true});
      request(
        this.forgotPasscallback,
        data,
        'POST',
        API_URL.FORGOT_PASS_API,
        header,
      );
    }
  };

  // api callback of forgot password

  forgotPasscallback = {
    success: async response => {
      await this.storeData(response);
      this.setState({isLoading: false});
      this.showAlert();

      setTimeout(() => {
        this.props.navigation.navigate('Set Password');
        this.hideAlert();
      }, 5000);
    },
    error: error => {
      this.setState({isLoading: false});
      Alert.alert('Error', error.message);
    },
  };

  // function to store data from api callback in asyncstorage

  storeData = async response => {
    try {
      await AsyncStorage.setItem('forgotPassData', JSON.stringify(response));
    } catch (e) {
      // saving error
    }
  };

  render() {
    const {showAlert} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>
        <View style={{marginHorizontal: 50}}>
          <View>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </View>

          <View style={styles.registerInput}>
            <MatIcon
              name="email"
              size={20}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={email => {
                this.setState({email}, () => {
                  this.validateEmail();
                });
              }}
            />
            {this.state.emailErr ? (
              <Text style={{color: 'white'}}>{this.state.emailErr}</Text>
            ) : null}
          </View>

          {this.state.isLoading ? <Loader /> : null}
          <View>
            <TouchableOpacity
              onPress={() => {
                this.forgotPassHandler();
              }}>
              <View style={styles.customBtnBG}>
                <Text style={styles.customBtnText}>Submit</Text>
              </View>
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

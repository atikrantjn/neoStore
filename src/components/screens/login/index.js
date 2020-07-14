import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
// import {setLoginData} from '../../../redux/actions';
// import {connect} from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import images from '../../../utils/images';
import {request, API_URL} from '../../../config/api';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import ModalLoader from '../../custom/modalLoader/index';

import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

      emailErrr: '',
      passErr: '',

      isLoading: false,
      showAlert: false,

      userToken: '',
      userData: {},

      token: '',
    };
  }

  // function to store user data in asyncstorage

  storeData = async response => {
    this.setState({token: response.token});
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(response));
    } catch (e) {
      // saving error
      console.log('error in storing data', e);
    }
  };

  // function for login api

  validateUser = () => {
    let useremail = this.validateEmail();
    let userpass = this.validatePassword();

    const userInput = {
      email: this.state.email,
      pass: this.state.password,
    };

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (useremail && userpass) {
      this.setState({isLoading: true});

      request(this.loginCallback, userInput, 'POST', API_URL.LOGIN_API, header);
    }
  };

  // api callback

  loginCallback = {
    success: async response => {
      await this.storeData(response);
      await this.getCartData();

      this.showAlert();

      this.setState({isLoading: false});

      setTimeout(() => {
        this.props.navigation.navigate('Home', {
          loggedIn: true,
        });
        this.hideAlert();
      }, 3000);
    },
    error: error => {
      Alert.alert('Error', error.message);
      this.setState({isLoading: false});
    },
  };

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

  // function to get cart data of user from api

  getCartData = () => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };
    request(this.cartCallback, null, 'GET', API_URL.GET_CUST_CART_API, header);
  };

  // callback from api of getCartData

  cartCallback = {
    success: async response => {
      console.log(response, 'from cart callback');
      let arr = [];
      if (response.status_code === 200) {
        if (response.product_details === undefined) {
          await AsyncStorage.setItem('cartData', JSON.stringify(arr));
        } else {
          await AsyncStorage.setItem(
            'cartData',
            JSON.stringify(response.product_details),
          );
        }
      }
    },
    error: error => {
      console.log('errr--------------------------', error);
    },
  };

  // function to check valid email address

  validateEmail = () => {
    let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
    if (this.state.email === '') {
      this.setState({emailErrr: 'cannot be kept blank'});
      return false;
    } else if (!pattern.test(this.state.email)) {
      this.setState({emailErrr: 'invalid email address'});
      return false;
    } else {
      this.setState({emailErrr: ''});
      return true;
    }
  };

  // function to check valid password

  validatePassword = () => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;
    if (this.state.password === '') {
      this.setState({passErr: 'cannot be kept blank'});
      return false;
    } else if (!passPattern.test(this.state.password)) {
      this.setState({
        passErr: 'Password must be 8-15 alphanumeric characters',
      });
      return false;
    } else {
      this.setState({passErr: ''});
      return true;
    }
  };

  render() {
    const {showAlert} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>
        {this.state.isLoading ? (
          <ModalLoader isLoading={this.state.isLoading} />
        ) : null}
        <View>
          <View style={styles.loginInput}>
            <FaIcon name="user" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              onChangeText={email => {
                this.setState({email}, () => {
                  this.validateEmail();
                });
              }}
              underlineColorAndroid="transparent"
            />
            {this.state.emailErrr ? (
              <Text style={styles.errorText}>{this.state.emailErrr}</Text>
            ) : null}
          </View>

          <View style={styles.loginInput}>
            <FaIcon name="lock" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              onChangeText={password => {
                this.setState({password}, () => {
                  this.validatePassword();
                });
              }}
              underlineColorAndroid="transparent"
            />
            {this.state.passErr ? (
              <Text style={styles.errorText}>{this.state.passErr}</Text>
            ) : null}
          </View>
          <View style={styles.loginInput}>
            <TouchableOpacity
              onPress={() => {
                this.validateUser();
              }}>
              <View style={styles.customBtnBG}>
                <Text style={styles.customBtnText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPassword}>
            <Text
              style={styles.forgotText}
              onPress={() => this.props.navigation.navigate('Forgot Password')}>
              Forgot Password ?
            </Text>
          </View>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>DON'T HAVE AN ACCOUNT ?</Text>
          <View style={styles.plusSignContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}>
              <Image style={styles.plusIcon} source={images.plusSign} />
            </TouchableOpacity>
          </View>
        </View>
        <AwesomeAlert
          show={showAlert}
          title="Yeahh"
          message="Login successful,redirecting...."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          messageStyle={{color: 'green', fontSize: 18}}
          contentContainerStyle={{width: 350, height: 120}}
        />
      </View>
    );
  }
}

export default Login;

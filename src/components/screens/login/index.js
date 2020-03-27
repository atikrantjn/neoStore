import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {setLoginData} from '../../../redux/actions';
import {connect} from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import images from '../../../utils/images';
import {request, API_URL} from '../../../config/api';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

      emailErrr: false,
      passErr: false,

      isLoading: false,
      showAlert: false,

      userToken: '',
      userData: {},
    };
  }

  storeData = async response => {
    console.log('in store data', response);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(response));
    } catch (e) {
      // saving error
      console.log('error in storing data', e);
    }
  };

  validateUser = () => {
    const userInput = {
      email: this.state.email,
      pass: this.state.password,
    };

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (userInput.email === '' || userInput.pass === '') {
      this.setState({emailErrr: true, passErr: true});
    } else {
      this.setState({isLoading: true});

      request(this.loginCallback, userInput, 'POST', API_URL.LOGIN_API, header);
    }
  };

  loginCallback = {
    success: response => {
      console.log('from login', response);
      // this.props.setLoginData(response);
      this.storeData(response);

      this.setState({isLoading: false});

      this.showAlert();
      setTimeout(() => {
        this.props.navigation.navigate('Home');
        this.hideAlert();
      }, 3000);
    },
    error: error => {
      this.setState({isLoading: false, emailErrr: false, passErr: false});

      console.log('wrong credentials', error);
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

  render() {
    const {showAlert} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>
        <View>
          <View style={styles.loginInput}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              onChangeText={email => {
                this.setState({email: email, emailErrr: false});
              }}
              underlineColorAndroid="transparent"></TextInput>
            {this.state.emailErrr ? (
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                * this field cannot be kept empty
              </Text>
            ) : null}
          </View>

          {this.state.isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null}

          <View style={styles.loginInput}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              onChangeText={password => {
                this.setState({password: password, passErr: false});
              }}
              underlineColorAndroid="transparent"
            />
            {this.state.passErr ? (
              <Text style={{color: 'white'}}>
                * this field cannot be kept empty
              </Text>
            ) : null}
          </View>
          <View style={styles.loginInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.validateUser();
              }}>
              <Text style={styles.customBtnText}>LOGIN</Text>
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
          <View style={styles.plusSign}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}>
              <Image style={{width: 30, height: 30}} source={images.plusSign} />
            </TouchableOpacity>
          </View>
        </View>
        <AwesomeAlert
          show={showAlert}
          title="Yeahh"
          message="login successful,redirecting...."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          messageStyle={{color: 'green', fontSize: 18}}
          contentContainerStyle={{width: 350, height: 120}}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
});

const mapDispatchToProps = dispatch => ({
  setLoginData: data => setLoginData(dispatch, data),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

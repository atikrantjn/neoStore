import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import CheckBox from 'react-native-check-box';
import RadioForm from 'react-native-simple-radio-button';
import styles from './styles';
import axios from 'axios';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {request, API_URL, BASE_URL} from '../../../config/api';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      pass: '',
      confirmPass: '',
      phone_no: '',
      gender: '',

      showAlert: false,
      isLoading: false,

      firstNameErr: false,
      isChecked: false,
      lastNameErr: false,
      emailErr: false,
      passwordErr: false,
      confirmPasswordErr: false,
      phoneErr: false,
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

  //email validate function

  validateEmail = email => {
    let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;

    if (pattern.test(email) === false) {
      this.setState({emailErr: true});
      return false;
    } else {
      this.setState({email: email, emailErr: false});
    }
  };

  //password validate function

  validatePassword = pass => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;

    if (passPattern.test(pass) === false) {
      this.setState({passwordErr: true});
      return false;
    } else {
      this.setState({pass: pass, passwordErr: false});
    }
  };

  //confirm password validate function

  validateConfPass = confirmPass => {
    let passv = this.state.pass;

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

  //phone number input validation function

  validatePhone = phone_no => {
    let phoneValid = /^[0-9]*(?:\d{1,2})?$/;

    if (phoneValid.test(phone_no) === false) {
      this.setState({phoneErr: true});
      return false;
    } else {
      this.setState({phone_no: phone_no, phoneErr: false});
    }
  };

  //validate form on button click function

  validateRegisterForm = () => {
    const data = {...this.state};

    const postData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      pass: this.state.pass,
      confirmPass: this.state.confirmPass,
      phone_no: this.state.phone_no,
      gender: this.state.gender,
    };

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (
      data.first_name == '' ||
      data.last_name == '' ||
      data.email == '' ||
      data.pass == '' ||
      data.confirmPass == '' ||
      data.phone_no == ''
    ) {
      alert('fields cannot be kept empty');
    } else if (
      data.passwordErr == false &&
      data.phoneErr == false &&
      data.emailErr == false &&
      data.firstNameErr == false &&
      data.lastNameErr == false &&
      data.confirmPasswordErr == false &&
      data.isChecked == true
    ) {
      this.setState({isLoading: true});

      request(
        this.registerCallBack,
        postData,
        'POST',
        API_URL.REGISTER_API,
        header,
      );
    } else {
      Alert.alert('falied');
    }
  };

  registerCallBack = {
    success: () => {
      this.setState({isLoading: false});
      this.showAlert();
      setTimeout(() => {
        this.props.navigation.navigate('Login');
      }, 5000);
    },
    error: () => {
      Alert.alert('oops something went wrong');
    },
  };

  render() {
    let gender = [
      {label: 'Male', value: 'male'},
      {label: 'Female', value: 'female'},
    ];

    const {showAlert} = this.state;
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.registerContainer}>
            <Text style={styles.neostoreHeader}>NeoSTORE</Text>
          </View>
          {this.state.isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null}

          <View>
            <View style={styles.registerInput}>
              <FaIcon
                name="user"
                size={25}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  color: 'white',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={first_name => {
                  this.setState({first_name}, () => {
                    if (this.state.first_name.length < 4) {
                      this.setState({firstNameErr: true});
                    } else {
                      this.setState({firstNameErr: false});
                    }
                  });
                }}></TextInput>
              {this.state.firstNameErr ? (
                <Text style={{color: 'white'}}>
                  this field must contain 3 characters
                </Text>
              ) : null}
            </View>

            <View style={styles.registerInput}>
              <FaIcon
                name="user"
                size={25}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  color: 'white',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={last_name => {
                  this.setState({last_name}, () => {
                    if (this.state.last_name.length < 4) {
                      this.setState({lastNameErr: true});
                    } else {
                      this.setState({lastNameErr: false});
                    }
                  });
                }}></TextInput>
              {this.state.lastNameErr ? (
                <Text style={{color: 'white'}}>
                  this field must contain 3 characters
                </Text>
              ) : null}
            </View>

            <View style={styles.registerInput}>
              <MatIcon
                name="email"
                size={25}
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
                onChangeText={email => this.validateEmail(email)}></TextInput>
              {this.state.emailErr ? (
                <Text style={{color: 'white'}}>invalid email address</Text>
              ) : null}
            </View>

            <View style={styles.registerInput}>
              <FaIcon
                name="lock"
                size={25}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  color: 'white',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={pass => this.validatePassword(pass)}></TextInput>
              {this.state.passwordErr ? (
                <Text style={{color: 'white'}}>
                  *Password must be 8-15 alphanumeric characters
                </Text>
              ) : null}
            </View>
            <View style={styles.registerInput}>
              <FaIcon
                name="lock"
                size={25}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  color: 'white',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={confirmPass => {
                  this.validateConfPass(confirmPass);
                }}></TextInput>
              {this.state.confirmPasswordErr ? (
                <Text style={{color: 'white'}}>Password did'nt matched!!</Text>
              ) : null}
            </View>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.genderText}>Gender</Text>
              <RadioForm
                radio_props={gender}
                buttonSize={20}
                buttonOuterSize={30}
                selectedButtonColor="white"
                selectedLabelColor="white"
                labelStyle={{fontSize: 20, marginTop: 5, color: 'white'}}
                formHorizontal={true}
                radioStyle={{paddingRight: 20}}
                disable={true}
                onPress={gender => {
                  this.setState({gender: gender});
                }}
              />
            </View>

            <View style={styles.registerInput}>
              <FaIcon
                name="phone"
                size={25}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  color: 'white',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                maxLength={10}
                keyboardType={'number-pad'}
                onChangeText={phone_no =>
                  this.validatePhone(phone_no)
                }></TextInput>
              {this.state.phoneErr ? (
                <Text style={{color: 'white'}}>
                  should not contain alphabets and characters and special
                  characters
                </Text>
              ) : null}
            </View>

            <View style={styles.checkbox}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked,
                  });
                }}
                isChecked={this.state.isChecked}
                rightText={'I agree Terms & Conditions'}
                rightTextStyle={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
                checkBoxColor="white"
              />
            </View>
            <View style={styles.registerInput}>
              <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => {
                  this.validateRegisterForm();
                }}>
                <Text style={styles.customBtnText}>REGISTER</Text>
              </TouchableOpacity>
            </View>
            <AwesomeAlert
              show={showAlert}
              title="Register form"
              message="Registered successfully,redirecting to login screen...."
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              messageStyle={{color: 'green', fontSize: 18}}
              contentContainerStyle={{width: 350, height: 120}}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Register;

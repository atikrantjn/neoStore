import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import CheckBox from 'react-native-check-box';
import RadioForm from 'react-native-simple-radio-button';
import styles from './styles';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {request, API_URL} from '../../../config/api';
import ModalLoader from '../../custom/modalLoader/index';

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
      gender: 'male',

      showAlert: false,
      isLoading: false,

      firstNameErr: '',
      isChecked: false,
      lastNameErr: '',
      emailErr: '',
      passwordErr: '',
      confirmPasswordErr: '',
      phoneErr: '',
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

  // function to validate user first name

  validateName = () => {
    if (this.state.first_name === '') {
      this.setState({firstNameErr: 'cannot be kept blank'});
      return false;
    } else {
      this.setState({firstNameErr: ''});
      return true;
    }
  };

  // function to validate user last name

  validateLastName = () => {
    if (this.state.last_name === '') {
      this.setState({lastNameErr: 'cannot be kept blank'});
      return false;
    } else {
      this.setState({lastNameErr: ''});
      return true;
    }
  };

  // function to validate user email

  validateEmail = email => {
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

  // function to validate user password

  validatePassword = () => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;
    if (this.state.pass === '') {
      this.setState({passwordErr: 'cannot be kept blank'});
      return false;
    } else if (!passPattern.test(this.state.pass)) {
      this.setState({
        passwordErr: 'Password must be 8-15 alphanumeric characters',
      });
      return false;
    } else {
      this.setState({passwordErr: ''});
      return true;
    }
  };

  // function to validate confirm password

  validateConfPass = () => {
    if (this.state.confirmPass === '') {
      this.setState({confirmPasswordErr: 'cannot be kept blank'});
      return false;
    } else if (!this.state.confirmPass.match(this.state.pass)) {
      this.setState({confirmPasswordErr: 'Password didnt matched!!'});
      return false;
    } else {
      this.setState({
        confirmPasswordErr: '',
      });
      return true;
    }
  };

  // function to validate user phone no.

  validatePhone = () => {
    let phoneValid = /^[0-9]*(?:\d{1,2})?$/;
    if (this.state.phone_no === '') {
      this.setState({phoneErr: 'cannot be kept blank'});
      return false;
    } else if (!phoneValid.test(this.state.phone_no)) {
      this.setState({
        phoneErr:
          'should not contain alphabets and characters and special characters',
      });
      return false;
    } else if (this.state.phone_no.length < 10) {
      this.setState({
        phoneErr: 'please enter 10 digit phone no.',
      });
      return false;
    } else {
      this.setState({phoneErr: ''});
      return true;
    }
  };

  // function to validate form on button click

  validateRegisterForm = () => {
    let name = this.validateName();
    let lname = this.validateLastName();
    let useremail = this.validateEmail();
    let userpassword = this.validatePassword();
    let userconfirmpass = this.validateConfPass();
    let userphone = this.validatePhone();
    let {isChecked} = this.state;

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
      name &&
      lname &&
      useremail &&
      userpassword &&
      userconfirmpass &&
      userphone &&
      isChecked
    ) {
      this.setState({isLoading: true});

      request(
        this.registerCallBack,
        postData,
        'POST',
        API_URL.REGISTER_API,
        header,
      );
    }
  };

  // callback from register api

  registerCallBack = {
    success: resp => {
      this.setState({isLoading: false});
      this.showAlert();
      setTimeout(() => {
        this.props.navigation.navigate('Login');
      }, 5000);
    },
    error: err => {
      Alert.alert('Error', err.message);
      this.setState({isLoading: false});
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
            <ModalLoader isLoading={this.state.isLoading} />
          ) : null}

          <View>
            <View style={styles.registerInput}>
              <FaIcon name="user" size={25} style={styles.iconStyle} />
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={first_name => {
                  this.setState({first_name}, () => {
                    this.validateName();
                  });
                }}
              />
              {this.state.firstNameErr ? (
                <Text style={styles.errorTextStyle}>
                  {this.state.firstNameErr}
                </Text>
              ) : null}
            </View>

            <View style={styles.registerInput}>
              <FaIcon name="user" size={25} style={styles.iconStyle} />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={last_name => {
                  this.setState({last_name}, () => {
                    this.validateLastName();
                  });
                }}
              />
              {this.state.lastNameErr ? (
                <Text style={styles.errorTextStyle}>
                  {this.state.lastNameErr}
                </Text>
              ) : null}
            </View>

            <View style={styles.registerInput}>
              <MatIcon name="email" size={25} style={styles.iconStyle} />
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
                <Text style={styles.errorTextStyle}>{this.state.emailErr}</Text>
              ) : null}
            </View>

            <View style={styles.registerInput}>
              <FaIcon name="lock" size={25} style={styles.iconStyle} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={pass => {
                  this.setState({pass}, () => {
                    this.validatePassword;
                  });
                }}
              />
              {this.state.passwordErr ? (
                <Text style={styles.errorTextStyle}>
                  {this.state.passwordErr}
                </Text>
              ) : null}
            </View>
            <View style={styles.registerInput}>
              <FaIcon name="lock" size={25} style={styles.iconStyle} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={confirmPass => {
                  this.setState({confirmPass}, () => {
                    this.validateConfPass();
                  });
                }}
              />
              {this.state.confirmPasswordErr ? (
                <Text style={styles.errorTextStyle}>
                  {this.state.confirmPasswordErr}
                </Text>
              ) : null}
            </View>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.genderText}>Gender</Text>
              <RadioForm
                radio_props={gender}
                buttonSize={15}
                buttonOuterSize={25}
                selectedButtonColor="white"
                selectedLabelColor="white"
                labelStyle={styles.radioLabelStyle}
                formHorizontal={true}
                radioStyle={styles.radioBtnStyle}
                disable={true}
                onPress={gender => {
                  this.setState({gender});
                }}
              />
            </View>

            <View style={styles.registerInput}>
              <FaIcon name="phone" size={25} style={styles.iconStyle} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                maxLength={10}
                keyboardType={'number-pad'}
                onChangeText={phone_no => {
                  this.setState({phone_no}, () => {
                    this.validatePhone();
                  });
                }}
              />
              {this.state.phoneErr ? (
                <Text style={styles.errorTextStyle}>{this.state.phoneErr}</Text>
              ) : null}
            </View>

            <View style={styles.checkbox}>
              <CheckBox
                style={styles.checkBoxStyle}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked,
                  });
                }}
                isChecked={this.state.isChecked}
                rightText={'I agree Terms & Conditions'}
                rightTextStyle={styles.termsConditionText}
                checkBoxColor="white"
              />
              {!this.state.isChecked ? (
                <Text style={styles.termsErrorText}>
                  please check terms and conditions
                </Text>
              ) : null}
            </View>
            <View style={styles.footerBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.validateRegisterForm();
                }}>
                <View style={styles.registerFormBtn}>
                  <Text style={styles.registerFormBtnText}>Register</Text>
                </View>
              </TouchableOpacity>
            </View>
            <AwesomeAlert
              show={showAlert}
              title="Success"
              message="Registered successfully,redirecting to login screen..."
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              messageStyle={styles.alertMessageStyle}
              contentContainerStyle={styles.alertContainerStyle}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Register;

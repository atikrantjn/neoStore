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

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {request, API_URL} from '../../../config/api';

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

  validateName = () => {
    if (this.state.first_name === '') {
      this.setState({firstNameErr: 'cannot be kept blank'});
      return false;
    } else {
      this.setState({firstNameErr: ''});
      return true;
    }
  };

  validateLastName = () => {
    if (this.state.last_name === '') {
      this.setState({lastNameErr: 'cannot be kept blank'});
      return false;
    } else {
      this.setState({lastNameErr: ''});
      return true;
    }
  };

  //email validate function

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

  //password validate function

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

  //confirm password validate function

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

  //phone number input validation function

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

  //validate form on button click function

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

  registerCallBack = {
    success: resp => {
      this.setState({isLoading: false});
      this.showAlert();
      setTimeout(() => {
        this.props.navigation.navigate('Login');
      }, 5000);
    },
    error: err => {
      Alert.alert('Error', 'oops something went wrong');
      this.setState({isLoading: false});
    },
  };

  render() {
    let gender = [
      {label: 'Male', value: 'male'},
      {label: 'Female', value: 'female'},
    ];

    console.log(this.state.isChecked);

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
                    this.validateName();
                  });
                }}
              />
              {this.state.firstNameErr ? (
                <Text style={{color: 'white'}}>{this.state.firstNameErr}</Text>
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
                    this.validateLastName();
                  });
                }}
              />
              {this.state.lastNameErr ? (
                <Text style={{color: 'white'}}>{this.state.lastNameErr}</Text>
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
                onChangeText={pass => {
                  this.setState({pass}, () => {
                    this.validatePassword;
                  });
                }}
              />
              {this.state.passwordErr ? (
                <Text style={{color: 'white'}}>{this.state.passwordErr}</Text>
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
                  this.setState({confirmPass}, () => {
                    this.validateConfPass();
                  });
                }}
              />
              {this.state.confirmPasswordErr ? (
                <Text style={{color: 'white'}}>
                  {this.state.confirmPasswordErr}
                </Text>
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
                  this.setState({gender});
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
                onChangeText={phone_no => {
                  this.setState({phone_no}, () => {
                    this.validatePhone();
                  });
                }}
              />
              {this.state.phoneErr ? (
                <Text style={{color: 'white'}}>{this.state.phoneErr}</Text>
              ) : null}
            </View>

            <View style={styles.checkbox}>
              <CheckBox
                style={{padding: 10}}
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
              {!this.state.isChecked ? (
                <Text
                  style={{
                    color: 'white',
                    paddingHorizontal: 10,
                  }}>
                  please check terms and conditions
                </Text>
              ) : null}
            </View>
            <View style={{marginHorizontal: 50}}>
              <TouchableOpacity
                onPress={() => {
                  this.validateRegisterForm();
                }}>
                <View style={styles.registerFormBtn}>
                  <Text style={styles.registerFormBtnText}> Register </Text>
                </View>
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

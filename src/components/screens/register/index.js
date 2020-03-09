import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import CheckBox from 'react-native-check-box';
import RadioForm from 'react-native-simple-radio-button';
import styles from './styles';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',

      phoneNumber: '',
      gender: '',

      showAlert: false,

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

  validatePassword = password => {
    let passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

    if (passPattern.test(password) === false) {
      this.setState({passwordErr: true});
      return false;
    } else {
      this.setState({password: password, passwordErr: false});
    }
  };

  //confirm password validate function

  validateConfPass = confirmPassword => {
    let pass = this.state.password;

    if (!confirmPassword.match(pass)) {
      this.setState({confirmPasswordErr: true});
      return false;
    } else {
      this.setState({
        confirmPassword: confirmPassword,
        confirmPasswordErr: false,
      });
    }
  };

  //phone number input validation function

  validatePhone = phoneNumber => {
    let phoneValid = /^[0-9]*(?:\d{1,2})?$/;

    if (phoneValid.test(phoneNumber) === false) {
      this.setState({phoneErr: true});
      return false;
    } else {
      this.setState({phoneNumber: phoneNumber, phoneErr: false});
    }
  };

  //validate form on button click function

  validateRegisterForm = () => {
    const data = {...this.state};
    console.log(data);

    if (
      data.passwordErr == false &&
      data.phoneErr == false &&
      data.emailErr == false &&
      data.firstNameErr == false &&
      data.lastNameErr == false &&
      data.confirmPasswordErr == false &&
      data.isChecked == true
    ) {
      this.showAlert();
      setTimeout(() => {
        this.props.navigation.navigate('Login');
      }, 3000);
    } else {
      alert('failure');
    }
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

          <View>
            <View style={styles.registerInput}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={firstName => {
                  this.setState({firstName}, () => {
                    if (this.state.firstName.length < 4) {
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
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={lastName => {
                  this.setState({lastName}, () => {
                    if (this.state.lastName.length < 4) {
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
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={password =>
                  this.validatePassword(password)
                }></TextInput>
              {this.state.passwordErr ? (
                <Text style={{color: 'white'}}>
                  *Password must be 8-15 characters and include atleast one
                  uppercase one lowercase letter and one numeric digit.
                </Text>
              ) : null}
            </View>
            <View style={styles.registerInput}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                secureTextEntry
                onChangeText={confirmPassword => {
                  this.validateConfPass(confirmPassword);
                }}></TextInput>
              {this.state.confirmPasswordErr ? (
                <Text style={{color: 'white'}}>Password did'nt matched!!</Text>
              ) : null}
            </View>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.genderText}>Gender</Text>
              <RadioForm
                radio_props={gender}
                initial={1}
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
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                maxLength={10}
                keyboardType={'number-pad'}
                onChangeText={phoneNumber =>
                  this.validatePhone(phoneNumber)
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
                  //   this.props.navigation.navigate('Login');
                  this.validateRegisterForm();
                }}>
                <Text style={styles.customBtnText}>REGISTER</Text>
              </TouchableOpacity>
            </View>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Register form"
              message="form submitted successfully"
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

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newpass: '',
      pass: '',
      confirmPass: '',

      passwordErr: false,
      confirmPasswordErr: false,
      newpassErr: false,
    };
  }

  validatePassword = pass => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;

    if (passPattern.test(pass) === false) {
      this.setState({passwordErr: true});
      return false;
    } else {
      this.setState({pass: pass, passwordErr: false});
    }
  };

  validateNewPassword = newpass => {
    let passPattern = /^([a-zA-Z0-9@*#]{8,15})$/;

    if (passPattern.test(newpass) === false) {
      this.setState({newpassErr: true});
      return false;
    } else {
      this.setState({newpass: newpass, newpassErr: false});
    }
  };

  validateConfPass = confirmPass => {
    let passv = this.state.newpass;

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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>

        <View style={{marginLeft: 50}}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              secureTextEntry
              onChangeText={pass => this.validatePassword(pass)}></TextInput>

            {this.state.passwordErr ? (
              <Text style={{color: 'white'}}>
                *Password must be 8-15 alphanumeric characters
              </Text>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              secureTextEntry
              onChangeText={newpass =>
                this.validateNewPassword(newpass)
              }></TextInput>

            {this.state.newpassErr ? (
              <Text style={{color: 'white'}}>
                *Password must be 8-15 alphanumeric characters
              </Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="white"
              secureTextEntry
              onChangeText={confirmPass => {
                this.validateConfPass(confirmPass);
              }}
              underlineColorAndroid="transparent"></TextInput>
            {this.state.confirmPasswordErr ? (
              <Text style={{color: 'white'}}>Password did'nt matched!!</Text>
            ) : null}
          </View>
          <View>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                alert('hello');
              }}>
              <Text style={styles.customBtnText}>RESET PASSWORD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ResetPassword;

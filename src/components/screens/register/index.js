import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
      gender: '',
      phoneNumber: '',
      agreeTerms: '',
    };
  }
  render() {
    let gender = [
      {label: 'Male', value: 0},
      {label: 'Female', value: 1},
    ];

    console.log(this.state.firstName);
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
                  this.setState({firstName});
                }}></TextInput>
            </View>
            <View style={styles.registerInput}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={lastName => {
                  this.setState({lastName});
                }}></TextInput>
            </View>
            <View style={styles.registerInput}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={email => {
                  this.setState({email});
                }}></TextInput>
            </View>
            <View style={styles.registerInput}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={password => {
                  this.setState({password});
                }}></TextInput>
            </View>
            <View style={styles.registerInput}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={confirmPassword => {
                  this.setState({confirmPassword});
                }}></TextInput>
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
              />
            </View>
            <View style={styles.registerInput}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={phoneNumber => {
                  this.setState({phoneNumber});
                }}></TextInput>
            </View>
            <View style={styles.checkbox}>
              <CheckBox
                style={{flex: 1, padding: 10}}
                // onClick={() => {
                //   this.setState({
                //     isChecked: !this.state.isChecked,
                //   });
                // }}
                // isChecked={this.state.isChecked}
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
                  this.props.navigation.navigate('Login');
                }}>
                <Text style={styles.customBtnText}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Register;

import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import images from '../../../../../utils/images';
import DatePicker from 'react-native-datepicker';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL, request} from '../../../../../config/api';
import AsyncStorage from '@react-native-community/async-storage';

export class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      dob: '',
      phone_no: '',
      gender: '',

      token: '',

      showAlert: false,

      firstNameErr: false,

      lastNameErr: false,
      emailErr: false,

      phoneErr: false,

      customerData: {},
    };
  }

  getToken = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({token: value.token});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  validatePhone = phone_no => {
    let phoneValid = /^[0-9]*(?:\d{1,2})?$/;

    if (phoneValid.test(phone_no) === false) {
      this.setState({phoneErr: true});
      return false;
    } else {
      this.setState({phone_no: phone_no, phoneErr: false});
    }
  };

  // validateEmail = email => {
  //   let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]$)$/;

  //   if (pattern.test(email) === false) {
  //     this.setState({emailErr: true});
  //     return false;
  //   } else {
  //     this.setState({email: email, emailErr: false});
  //   }
  // };

  updateProfile = () => {
    console.log(this.state.token);
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_no: this.state.phone_no,
      dob: this.state.dob,
      gender: this.state.gender,
    };
    const {token} = this.state;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    request(
      this.updateProfileCallback,
      data,
      'PUT',
      API_URL.EDIT_USER_PROFILE_API,
      header,
    );
  };

  updateProfileCallback = {
    success: response => {
      Alert.alert('Your profile has been successfully updated');
      this.props.navigation.navigate('My Account');
    },
    error: error => {
      Alert.alert('something went wrong');
    },
  };

  componentDidMount = async () => {
    await this.getToken();
    const {customerData} = this.props.route.params;
    this.setState({
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email: customerData.email,
      phone_no: customerData.phone_no,
      gender: customerData.gender,
    });
  };

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Image
              source={images.sideDrawerImage}
              style={{height: 150, width: 150, borderRadius: 100}}
            />
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
              value={this.state.first_name}
              onChangeText={first_name => {
                this.setState({first_name: first_name});
              }}
              underlineColorAndroid="transparent"
            />
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
              value={this.state.last_name}
              underlineColorAndroid="transparent"
              onChangeText={last_name => {
                this.setState({last_name: last_name});
              }}
            />
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
              value={this.state.email}
              placeholder="email"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({email})}
            />
            {this.state.emailErr ? (
              <Text style={{color: 'white'}}>invalid email address</Text>
            ) : null}
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
              value={this.state.phone_no}
              placeholder="phone no."
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              maxLength={10}
              onChangeText={phone_no => this.validatePhone(phone_no)}
            />
            {this.state.phoneErr ? (
              <Text style={{color: 'white'}}>
                should not contain alphabets and characters and special
                characters
              </Text>
            ) : null}
          </View>

          <View style={styles.registerInput}>
            <DatePicker
              date={this.state.dob}
              style={{
                width: '100%',
                color: 'white',
                borderColor: 'white',
                borderWidth: 1.5,
              }}
              mode="date"
              maxDate={new Date()}
              placeholder="select date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 5,
                  top: 4,
                },
                dateText: {
                  color: 'white',
                  fontSize: 20,
                },
              }}
              onDateChange={date => {
                this.setState({dob: date});
              }}
            />
          </View>
          <View style={styles.registerInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.updateProfile();
              }}>
              <Text style={styles.customBtnText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EditProfile;

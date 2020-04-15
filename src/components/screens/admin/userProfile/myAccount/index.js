import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import images from '../../../../../utils/images';

import {request, API_URL} from '../../../../../config/api';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',

      customerData: {},
    };
  }

  // get token from async storage

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

  //get customer profile data

  customerProfile = () => {
    const data = null;
    const {token} = this.state;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    request(
      this.getCustDataCallback,
      data,
      'GET',
      API_URL.GET_CUST_PROFILE_API,
      header,
    );
  };

  getCustDataCallback = {
    success: async response => {
      const customerData = await response.customer_proile;

      this.setState({customerData: customerData});
    },
    error: error => {
      console.log('errr customer data', error);
    },
  };

  componentDidMount = async () => {
    await this.getToken();

    this.customerProfile();
    setInterval(this.customerProfile, 5000);
  };

  render() {
    const {customerData} = this.state;
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {customerData.profile_img === null ? (
              <Image
                source={images.userIcon}
                style={{height: 150, width: 150, borderRadius: 100}}
              />
            ) : (
              <Image
                source={customerData.profile_img}
                style={{height: 150, width: 150, borderRadius: 100}}
              />
            )}
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
              value={customerData.first_name}
              underlineColorAndroid="transparent"
              editable={false}></TextInput>
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
              value={customerData.last_name}
              underlineColorAndroid="transparent"
              editable={false}></TextInput>
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
              value={customerData.email}
              underlineColorAndroid="transparent"
              editable={false}></TextInput>
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
              value={customerData.phone_no}
              underlineColorAndroid="transparent"
              editable={false}></TextInput>
          </View>
          <View style={styles.registerInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.props.navigation.navigate('Edit Profile', {
                  customerData: this.state.customerData,
                });
              }}>
              <Text style={styles.customBtnText}>EDIT PROFILE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.props.navigation.navigate('Reset Password');
              }}>
              <Text style={styles.customBtnText}>RESET PASSWORD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default MyAccount;

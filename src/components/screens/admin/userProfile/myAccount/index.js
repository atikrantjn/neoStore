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
import ModalLoader from '../../../../custom/modalLoader/index';

import {request, API_URL, BASE_URL} from '../../../../../config/api';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isLoading: false,

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
    const {token} = this.state;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    this.setState({isLoading: true});

    setTimeout(() => {
      request(
        this.getCustDataCallback,
        null,
        'GET',
        API_URL.GET_CUST_PROFILE_API,
        header,
      );
    }, 2000);
  };

  getCustDataCallback = {
    success: async response => {
      const customerData = response.customer_proile;

      this.setState({customerData: customerData, isLoading: false});
    },
    error: error => {
      console.log('errr customer data', error);
    },
  };

  componentDidMount = async () => {
    await this.getToken();

    await this.customerProfile();
  };

  componentDidUpdate = prev => {
    if (prev !== this.props) {
      this.customerProfile();
    }
  };

  render() {
    const {customerData} = this.state;
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          {this.state.isLoading ? (
            <ModalLoader isLoading={this.state.isLoading} />
          ) : null}
          <View style={styles.imageContainer}>
            {customerData.profile_img === null ? (
              <Image source={images.userIcon} style={styles.image} />
            ) : (
              <Image
                source={{
                  uri: BASE_URL + customerData.profile_img,
                }}
                style={styles.image}
              />
            )}
          </View>

          <View style={styles.registerInput}>
            <FaIcon name="user" size={20} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              value={customerData.first_name}
              underlineColorAndroid="transparent"
              editable={false}
            />
          </View>

          <View style={styles.registerInput}>
            <FaIcon name="user" size={20} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              value={customerData.last_name}
              underlineColorAndroid="transparent"
              editable={false}
            />
          </View>

          <View style={styles.registerInput}>
            <MatIcon name="email" size={20} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              value={customerData.email}
              underlineColorAndroid="transparent"
              editable={false}
            />
          </View>

          <View style={styles.registerInput}>
            <FaIcon name="phone" size={20} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              value={customerData.phone_no}
              underlineColorAndroid="transparent"
              editable={false}
            />
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Edit Profile', {
                  customerData: this.state.customerData,
                });
              }}>
              <View style={styles.customBtnBG}>
                <Text style={styles.customBtnText}>EDIT PROFILE</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Reset Password');
              }}>
              <View style={styles.customBtnBG}>
                <Text style={styles.customBtnText}>RESET PASSWORD</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default MyAccount;

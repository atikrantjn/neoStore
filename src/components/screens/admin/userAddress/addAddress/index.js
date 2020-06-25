import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {request, API_URL} from '../../../../../config/api';
import Loader from '../../../../custom/loaderComponent/loader';

class AddAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      isLoading: false,
      pincodeErr: false,
      allFieldsRequired: false,

      token: '',
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

  validatepincode = pincode => {
    let pat1 = /^\d{6}$/;

    if (pat1.test(pincode)) {
      this.setState({pincodeErr: false, pincode: pincode});
    } else {
      this.setState({pincodeErr: true});
    }
  };

  saveAddress = () => {
    const {address, landmark, city, state, pincode, country} = this.state;

    if (
      address === '' ||
      landmark === '' ||
      city === '' ||
      state === '' ||
      pincode === '' ||
      country === ''
    ) {
      Alert.alert('fields cannot be kept empty');
    } else {
      this.submitAddress();
    }
  };

  submitAddress = () => {
    const postAddressData = {
      address: this.state.address,
      pincode: this.state.pincode,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
    };
    const {token} = this.state;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    this.setState({isLoading: true});

    request(
      this.addAddressCallback,
      postAddressData,
      'POST',
      API_URL.SAVE_ADDRESS_API,
      header,
    );
  };

  addAddressCallback = {
    success: response => {
      this.setState({isLoading: false});
      Alert.alert(response.message);

      setTimeout(() => {
        this.props.navigation.goBack(null);
      }, 3000);
    },
    error: error => {
      this.setState({isLoading: true});
      Alert.alert('oopss something went wrong');
    },
  };

  // get token method call in componentdidmount

  componentDidMount = async () => {
    await this.getToken();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>Address</Text>
              <TextInput
                ref={this.myTextInput}
                numberOfLines={4}
                multiline
                textAlignVertical={'top'}
                style={styles.addressTextInput}
                onChangeText={address => {
                  this.setState({address: address});
                }}
              />
            </View>

            <View style={styles.landmarkContainer}>
              <Text style={styles.landmarkText}>Landmark</Text>
              <TextInput
                ref={this.myTextInput}
                style={styles.landmarkTextInput}
                onChangeText={landmark => {
                  this.setState({landmark: landmark});
                }}
              />
            </View>

            {this.state.isLoading ? <Loader /> : null}

            <View style={styles.cityStateContainer}>
              <View style={styles.cityTextContainer}>
                <Text style={styles.cityText}>City</Text>
                <TextInput
                  ref={this.myTextInput}
                  style={styles.cityTextInput}
                  onChangeText={city => {
                    this.setState({city: city});
                  }}
                />
              </View>

              <View style={styles.stateTextContainer}>
                <Text style={styles.stateText}>State</Text>
                <TextInput
                  ref={this.myTextInput}
                  style={styles.stateTextInput}
                  onChangeText={state => {
                    this.setState({state: state});
                  }}
                />
              </View>
            </View>

            <View style={styles.zipCountryContainer}>
              <View style={styles.zipContainer}>
                <Text style={styles.zipText}>Zip Code</Text>
                <TextInput
                  keyboardType={'number-pad'}
                  style={styles.zipTextInput}
                  onChangeText={pincode => {
                    this.validatepincode(pincode);
                  }}
                />
                {this.state.pincodeErr ? (
                  <Text style={{fontSize: 15, color: 'red', marginLeft: 15}}>
                    * should be 6 digits only
                  </Text>
                ) : null}
              </View>

              <View style={styles.countryContainer}>
                <Text style={styles.countryText}>Country</Text>
                <TextInput
                  style={styles.countryTextInput}
                  onChangeText={country => {
                    this.setState({country: country});
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.saveAddressBtnBg}
            onPress={() => {
              this.saveAddress();
            }}>
            <Text style={styles.saveAddressBtnText}>SAVE ADDRESS</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.saveAddressBtnBg}
            onPress={() => {
              this.props.navigation.navigate('Address List');
            }}>
            <Text style={styles.saveAddressBtnText}> ADDRESS List </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AddAddress;

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

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAddressListData} from '../../../../../redux/actions';

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

      token: '',
      isLoading: false,

      pincodeErr: '',
      addressErr: '',
      landmarkErr: '',
      cityErr: '',
      stateErr: '',
      countryErr: '',
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

  saveAddress = () => {
    const {address, landmark, city, state, pincode, country} = this.state;

    let addr = this.handleAddress();
    let land = this.handleLandmark();
    let cit = this.handlecity();
    let stat = this.handlestate();
    let pin = this.handlePincode();
    let coun = this.handlecountry();

    if (addr && land && cit && stat && pin && coun) {
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
      this.getAddressList();
      this.setState({
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        pincodeErr: '',
        addressErr: '',
        landmarkErr: '',
        cityErr: '',
        stateErr: '',
        countryErr: '',
      });
    },
    error: error => {
      this.setState({isLoading: false});
      Alert.alert('Error', 'oopss something went wrong');
    },
  };

  // get token method call in componentdidmount

  componentDidMount = async () => {
    await this.getToken();
  };

  getAddressList = () => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

    request(
      this.custAddressCallback,
      null,
      'GET',
      API_URL.GET_CUST_ADDRESS_API,
      header,
    );
  };

  custAddressCallback = {
    success: response => {
      const {setAddressListData} = this.props;

      setAddressListData(response.customer_address);

      Alert.alert(
        'Success',
        'Address added',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('Address List');
            },
          },
        ],
        {cancelable: false},
      );
      this.setState({
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        isLoading: false,
        // pincodeErr: false,
      });
    },
    error: error => {
      console.log(error, 'rrrr');
    },
  };

  handleAddress = () => {
    if (this.state.address === '') {
      this.setState({addressErr: 'fields cannot be kept empty'});
      return false;
    } else {
      this.setState({addressErr: ''});
      return true;
    }
  };

  handleLandmark = () => {
    if (this.state.landmark === '') {
      this.setState({landmarkErr: 'fields cannot be kept empty'});
      return false;
    } else {
      this.setState({landmarkErr: ''});
      return true;
    }
  };

  handlecity = () => {
    if (this.state.city === '') {
      this.setState({cityErr: 'fields cannot be kept empty'});
      return false;
    } else {
      this.setState({cityErr: ''});
      return true;
    }
  };

  handlestate = () => {
    if (this.state.state === '') {
      this.setState({stateErr: 'fields cannot be kept empty'});
      return false;
    } else {
      this.setState({stateErr: ''});
      return true;
    }
  };

  handlePincode = () => {
    let pat1 = /^\d{6}$/;
    if (this.state.pincode === '') {
      this.setState({pincodeErr: '*fields cannot be kept empty'});
      return false;
    } else if (!pat1.test(this.state.pincode)) {
      this.setState({pincodeErr: '*should be 6 digits only'});
      return false;
    } else {
      this.setState({pincodeErr: ''});
      return true;
    }
  };

  handlecountry = () => {
    if (this.state.country === '') {
      this.setState({countryErr: 'fields cannot be kept empty'});
      return false;
    } else {
      this.setState({countryErr: ''});
      return true;
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{flex: 0.9}}>
          <ScrollView>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>Address</Text>
              <TextInput
                numberOfLines={3}
                multiline
                textAlignVertical={'top'}
                style={styles.addressTextInput}
                onChangeText={address =>
                  this.setState(
                    {
                      address: address,
                    },
                    () => {
                      this.handleAddress();
                    },
                  )
                }
              />
              {this.state.addressErr ? (
                <Text style={{fontSize: 15, color: 'red', marginLeft: 15}}>
                  {this.state.addressErr}
                </Text>
              ) : null}
            </View>

            <View style={styles.landmarkContainer}>
              <Text style={styles.landmarkText}>Landmark</Text>
              <TextInput
                style={styles.landmarkTextInput}
                onChangeText={landmark =>
                  this.setState(
                    {
                      landmark: landmark,
                    },
                    () => {
                      this.handleLandmark();
                    },
                  )
                }
              />
              {this.state.landmarkErr ? (
                <Text style={{fontSize: 15, color: 'red', marginLeft: 15}}>
                  {this.state.landmarkErr}
                </Text>
              ) : null}
            </View>

            {this.state.isLoading ? <Loader /> : null}

            <View style={styles.cityStateContainer}>
              <View style={styles.cityTextContainer}>
                <Text style={styles.cityText}>City</Text>
                <TextInput
                  ref={input => {
                    this.textInput = input;
                  }}
                  style={styles.cityTextInput}
                  onChangeText={city =>
                    this.setState(
                      {
                        city: city,
                      },
                      () => {
                        this.handlecity();
                      },
                    )
                  }
                />
                {this.state.cityErr ? (
                  <Text style={{fontSize: 15, color: 'red', marginLeft: 15}}>
                    {this.state.cityErr}
                  </Text>
                ) : null}
              </View>

              <View style={styles.stateTextContainer}>
                <Text style={styles.stateText}>State</Text>
                <TextInput
                  ref={input => {
                    this.textInput = input;
                  }}
                  style={styles.stateTextInput}
                  onChangeText={state =>
                    this.setState(
                      {
                        state: state,
                      },
                      () => {
                        this.handlestate();
                      },
                    )
                  }
                />
                {this.state.stateErr ? (
                  <Text style={{fontSize: 15, color: 'red', marginLeft: 15}}>
                    {this.state.stateErr}
                  </Text>
                ) : null}
              </View>
            </View>

            <View style={styles.zipCountryContainer}>
              <View style={styles.zipContainer}>
                <Text style={styles.zipText}>Zip code</Text>
                <TextInput
                  keyboardType={'number-pad'}
                  style={styles.zipTextInput}
                  onChangeText={pincode =>
                    this.setState(
                      {
                        pincode: pincode,
                      },
                      () => {
                        this.handlePincode();
                      },
                    )
                  }
                />
                {this.state.pincodeErr ? (
                  <Text style={{fontSize: 15, color: 'red', marginLeft: 15}}>
                    {this.state.pincodeErr}
                  </Text>
                ) : null}
              </View>

              <View style={styles.countryContainer}>
                <Text style={styles.countryText}>Country</Text>
                <TextInput
                  style={styles.countryTextInput}
                  onChangeText={country =>
                    this.setState(
                      {
                        country: country,
                      },
                      () => {
                        this.handlecountry();
                      },
                    )
                  }
                />
                {this.state.countryErr ? (
                  <Text style={{fontSize: 15, color: 'red', marginLeft: 15}}>
                    {this.state.countryErr}
                  </Text>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={{flex: 0.1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',

              marginBottom: 15,
            }}>
            <View style={{flex: 0.5}}>
              <TouchableOpacity
                style={{marginHorizontal: 15}}
                onPress={() => {
                  this.saveAddress();
                }}>
                <View style={styles.saveAddressBtnBg}>
                  <Text style={styles.saveAddressBtnText}>SAVE ADDRESS</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5}}>
              <TouchableOpacity
                style={{marginHorizontal: 15}}
                onPress={() => {
                  this.props.navigation.navigate('Address List');
                }}>
                <View style={styles.saveAddressBtnBg}>
                  <Text style={styles.saveAddressBtnText}> ADDRESS LIST </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  addressList: state.addressList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setAddressListData,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddAddress);

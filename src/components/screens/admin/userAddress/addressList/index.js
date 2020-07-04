import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {request, API_URL} from '../../../../../config/api';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../../custom/loaderComponent/loader';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAddressListData} from '../../../../../redux/actions';

import {Radio} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../../utils/colors';
export class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      token: '',

      address: '',
      custmorAddress: {},
      isLoading: false,
      checked: false,
    };
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#b4b4b4',
          marginBottom: 15,
        }}
      />
    );
  };

  //get data from asyncStorage

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({token: value.token, data: value.customer_details});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  recievedData = () => {
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
      this.setState({isLoading: false});
    },
    error: error => {
      console.log(error, 'rrrr');
      this.setState({addressData: {}});
    },
  };

  updateAddress = () => {
    const data = this.state.custmorAddress;

    const {addressList} = this.props;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

    if (this.state.checked || addressList.data.length !== 0) {
      this.setState({isLoading: true});

      request(
        this.updateAddressCallback,
        data,
        'PUT',
        API_URL.UPDATE_ADDRESS_API,
        header,
      );
    } else {
      Alert.alert('Error', 'please select one address first');
    }
  };

  updateAddressCallback = {
    success: response => {
      const title = 'success';
      const message = response.message;
      const buttons = [
        {
          text: 'ok',
          onPress: () => {
            this.setState({isLoading: false});
            this.props.navigation.navigate('OrderSummary');
          },
        },
      ];
      Alert.alert(title, message, buttons);
    },
    error: error => {
      console.log('errr', error);
    },
  };

  removeAddress = id => {
    const title = 'Time to choose!';
    const message = 'are u sure u wanna remove this address';
    const buttons = [
      {text: 'Cancel', type: 'cancel'},
      {
        text: 'yes',
        onPress: () => {
          this.removeItem(id);
        },
      },
    ];
    Alert.alert(title, message, buttons);
  };

  removeItem = id => {
    const data = {
      address_id: id,
    };
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

    request(
      this.deleteAddressCallback,
      data,
      'DELETE',
      API_URL.REMOVE_ADDRESS_API + id,
      header,
    );
  };

  deleteAddressCallback = {
    success: response => {
      this.recievedData();
      Alert.alert('Success', 'one customer address deleted successfully');
    },
    error: error => {
      Alert.alert('Error', 'oops something went wrong');
    },
  };

  componentDidMount = async () => {
    await this.getData();

    await this.recievedData();
    //setInterval(this.recievedData, 2000);
  };

  render() {
    const {addressList} = this.props;

    const fullName =
      this.state.data.first_name + ' ' + this.state.data.last_name;

    const deviceWidth = Dimensions.get('window').width;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{fontSize: 22, margin: 15, color: '#8B8888'}}>
            Shipping Address
          </Text>
          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: '#b4b4b4',
            }}
          />
          {this.state.isLoading ? <Loader /> : null}
          {addressList.data.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <View>
                <FaIcon size={88} name="frown-open" />
              </View>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                Oooopsssss address not found!!
              </Text>
            </View>
          ) : (
            <FlatList
              data={addressList.data}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              ListFooterComponent={this.FlatListItemSeparator}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      width: deviceWidth,
                      marginVertical: 10,
                    }}>
                    <View style={{marginTop: 30, marginHorizontal: 10}}>
                      <Radio
                        onPress={() => {
                          this.setState({
                            address:
                              item.address +
                              ', ' +
                              item.city +
                              ', ' +
                              item.state +
                              ', ' +
                              item.pincode +
                              ', ' +
                              item.country,

                            checked: true,
                          });
                          this.setState({
                            custmorAddress: {
                              address_id: item.address_id,
                              address: item.address,
                              pincode: item.pincode,
                              city: item.city,
                              state: item.state,
                              country: item.country,
                              isDeliveryAddress: true,
                            },
                          });
                        }}
                        selected={
                          this.state.address ===
                          item.address +
                            ', ' +
                            item.city +
                            ', ' +
                            item.state +
                            ', ' +
                            item.pincode +
                            ', ' +
                            item.country
                        }
                        selectedColor="blue"
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={{marginHorizontal: 10, fontSize: 20}}>
                          {fullName}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              marginHorizontal: 10,
                              fontSize: 18,
                              width: '70%',
                            }}>
                            {item.address}
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              this.removeAddress(item.address_id);
                            }}>
                            <View
                              style={{
                                borderRadius: 7,
                                padding: 7,
                                backgroundColor: colors.themeColor,
                                paddingVertical: 8,
                                paddingHorizontal: 10,
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: 'white',
                                  textAlign: 'center',
                                }}>
                                Remove
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <Text
                            style={{
                              marginHorizontal: 10,
                              fontSize: 18,
                            }}>
                            {item.pincode},{item.country}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
        <View>
          <TouchableOpacity
            style={{marginHorizontal: 15}}
            onPress={() => {
              this.updateAddress();
            }}>
            <View
              style={{
                backgroundColor: colors.themeColor,
                borderRadius: 7,
                paddingVertical: 6,
                paddingHorizontal: 14,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                }}>
                SAVE ADDRESS
              </Text>
            </View>
          </TouchableOpacity>
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
)(AddressList);

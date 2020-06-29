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

import {Radio} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
export class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      token: '',
      addressData: {},
      checked: false,
      address: '',
      custmorAddress: {},
      isLoading: false,
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

  componentDidMount = async () => {
    await this.getData();

    await this.recievedData();
    //setInterval(this.recievedData, 2000);
  };

  custAddressCallback = {
    success: response => {
      this.setState({addressData: response.customer_address, isLoading: false});
    },
    error: error => {
      console.log(error, 'rrrr');
      this.setState({addressData: {}});
    },
  };

  updateAddress = () => {
    const data = this.state.custmorAddress;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

    this.setState({isLoading: true});

    request(
      this.updateAddressCallback,
      data,
      'PUT',
      API_URL.UPDATE_ADDRESS_API,
      header,
    );
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
      Alert.alert('one customer address deleted successfully');
    },
    error: error => {
      alert('error');
    },
  };

  render() {
    const fullName =
      this.state.data.first_name + ' ' + this.state.data.last_name;

    const deviceWidth = Dimensions.get('window').width;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{fontSize: 30, margin: 20, color: '#8B8888'}}>
            Shipping Address
          </Text>
          <View
            style={{
              height: 2,
              width: '100%',
              backgroundColor: '#b4b4b4',
              marginBottom: 15,
            }}
          />
          {this.state.isLoading ? <Loader /> : null}
          {Object.keys(this.state.addressData).length === 0 &&
          this.state.addressData.constructor === Object ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <View>
                <FaIcon size={98} name="frown-open" />
              </View>
              <Text style={{fontSize: 24, textAlign: 'center'}}>
                Oooopsssss address not found!!
              </Text>
            </View>
          ) : (
            <FlatList
              data={this.state.addressData}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              ListFooterComponent={this.FlatListItemSeparator}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <View style={{marginTop: 40, marginLeft: 10}}>
                      <Radio
                        onPress={() => {
                          // console.log(item);
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
                          this.state.address ==
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
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{marginHorizontal: 10, fontSize: 30}}>
                          {fullName}
                        </Text>
                        <View style={{flexDirection: 'row', flex: 1}}>
                          <Text
                            style={{
                              marginHorizontal: 10,
                              fontSize: 25,
                              width: deviceWidth - 130,
                            }}>
                            {item.address}
                          </Text>
                          <View>
                            <TouchableOpacity
                              style={{
                                borderRadius: 7,
                                padding: 7,
                                backgroundColor: 'red',
                                height: 30,
                              }}
                              onPress={() => {
                                this.removeAddress(item.address_id);
                              }}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: 'white',
                                  textAlign: 'center',
                                }}>
                                remove
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontSize: 20,
                            marginBottom: 10,
                          }}>
                          {item.pincode} , {item.country}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 7,
            marginBottom: 8,
            height: 55,
          }}
          onPress={() => {
            this.updateAddress();
          }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: 'white',
              padding: 5,
              textAlign: 'center',
            }}>
            SAVE ADDRESS
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddressList;

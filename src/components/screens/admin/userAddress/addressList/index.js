import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, Alert} from 'react-native';
import {request, API_URL} from '../../../../../config/api';
import AsyncStorage from '@react-native-community/async-storage';

import {RadioButton} from 'react-native-paper';
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
    const data = null;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

    request(
      this.custAddressCallback,
      data,
      'GET',
      API_URL.GET_CUST_ADDRESS_API,
      header,
    );
  };

  componentDidMount = async () => {
    await this.getData();

    this.recievedData();
    // setInterval(this.recievedData, 5000);
  };

  custAddressCallback = {
    success: async response => {
      await this.setState({addressData: response.customer_address});
    },
    error: error => {
      console.log('errr', error);
    },
  };

  updateAddress = () => {
    const data = this.state.custmorAddress;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

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
      Alert.alert(response.message);
    },
    error: error => {
      console.log('errr', error);
    },
  };

  render() {
    const fullName =
      this.state.data.first_name + ' ' + this.state.data.last_name;

    //console.log(this.state.address);

    console.log(this.state.addressData);

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
                        <Text style={{marginHorizontal: 10, fontSize: 25}}>
                          {item.address}
                        </Text>
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
            marginBottom: 10,
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

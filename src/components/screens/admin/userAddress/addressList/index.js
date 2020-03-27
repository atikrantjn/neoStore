import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {request, API_URL} from '../../../../../config/api';
import AsyncStorage from '@react-native-community/async-storage';
// import RadioForm from 'react-native-simple-radio-button';
import {RadioButton} from 'react-native-paper';
export class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      token: '',
      addressData: {},
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
  componentDidMount = async () => {
    await this.getData();

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

  custAddressCallback = {
    success: response => {
      // const addressDetails = JSON.parse(JSON.stringify(response));
      this.setState({addressData: response.customer_address});
    },
    error: error => {
      console.log('errr', error);
    },
  };

  render() {
    console.log('user daata', this.state.addressData);
    const {checked} = this.state;
    const fullName =
      this.state.data.first_name + ' ' + this.state.data.last_name;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{fontSize: 30, margin: 20, color: '#8B8888'}}>
            Shipping Address
          </Text>
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
                  <View style={{marginTop: 40}}>
                    <RadioButton
                      status={checked ? true : false}
                      onPress={() => {
                        this.setState({checked: true});
                      }}
                    />
                  </View>

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
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 7,
            marginBottom: 10,
            height: 55,
          }}
          onPress={() => {
            alert('hello');
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

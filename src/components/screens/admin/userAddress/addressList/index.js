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
import ModalLoader from '../../../../custom/modalLoader/index';
import styles from './styles';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setAddressListData} from '../../../../../redux/actions';

import {Radio} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
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
      this.setState({isLoading: false});

      setAddressListData(response.customer_address);
    },
    error: error => {
      Alert.alert('Error', error.message);
    },
  };

  updateAddress = () => {
    const data = this.state.custmorAddress;

    const {addressList} = this.props;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + this.state.token,
    };

    if (this.state.checked === true && addressList.data.length !== 0) {
      this.setState({isLoading: true});

      setTimeout(() => {
        request(
          this.updateAddressCallback,
          data,
          'PUT',
          API_URL.UPDATE_ADDRESS_API,
          header,
        );
      }, 2000);
    } else {
      Alert.alert('Error', 'Please select one address first');
    }
  };

  updateAddressCallback = {
    success: response => {
      this.setState({isLoading: false});
      const title = 'success';
      const message = response.message;
      const buttons = [
        {
          text: 'ok',
          onPress: () => {
            this.props.navigation.navigate('OrderSummary', {
              updatedAddress: true,
            });
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
    const message = 'Are u sure u wanna remove this address';
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

    this.setState({isLoading: true});
    setTimeout(() => {
      request(
        this.deleteAddressCallback,
        data,
        'DELETE',
        API_URL.REMOVE_ADDRESS_API + id,
        header,
      );
    }, 2000);
  };

  deleteAddressCallback = {
    success: response => {
      this.setState({isLoading: false});
      Alert.alert('Success', response.message, [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    },
    error: error => {
      this.setState({isLoading: false});

      Alert.alert('Error', error.message);
    },
  };

  componentDidMount = async () => {
    await this.getData();

    await this.recievedData();
  };

  render() {
    const {addressList} = this.props;

    const fullName =
      this.state.data.first_name + ' ' + this.state.data.last_name;

    return (
      <View style={styles.mainContainer}>
        {this.state.isLoading ? (
          <ModalLoader isLoading={this.state.isLoading} />
        ) : null}
        <View style={styles.shippingAddressContainer}>
          <Text style={styles.shippingAddressText}>Shipping Address</Text>
          <View style={styles.seperator} />

          {addressList.data.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View>
                <FaIcon size={88} name="frown-open" />
              </View>
              <Text style={styles.emptyText}>
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
                  <View style={styles.renderMainContainer}>
                    <View style={styles.renderRadioContainer}>
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

                            custmorAddress: {
                              address_id: item.address_id,
                              address: item.address,
                              pincode: item.pincode,
                              city: item.city,
                              state: item.state,
                              country: item.country,
                              isDeliveryAddress: true,
                            },
                            checked: true,
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
                    <View style={styles.renderAddressContainer}>
                      <View style={styles.renderAddressRow}>
                        <Text style={styles.renderNameText}>{fullName}</Text>
                        <View style={styles.renderAddressRowContainer}>
                          <Text style={styles.renderAddressText}>
                            {item.address}
                          </Text>

                          <TouchableOpacity
                            onPress={() => {
                              this.removeAddress(item.address_id);
                            }}>
                            <View style={styles.renderRemoveBtnContainer}>
                              <Text style={styles.removeBtnText}>Remove</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <Text style={styles.renderPinCountryText}>
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
            style={styles.footerContainer}
            onPress={() => {
              this.updateAddress();
            }}>
            <View style={styles.footerBtnContainer}>
              <Text style={styles.footerBtnText}>SAVE ADDRESS</Text>
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

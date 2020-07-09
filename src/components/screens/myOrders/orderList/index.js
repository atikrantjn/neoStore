import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../../config/api';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../../custom/loaderComponent/loader';
import moment from 'moment';
import styles from './styles';
export class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isLoading: false,
      placedOrderDetails: [],
    };
  }

  componentDidMount = async () => {
    await this.getToken();
    await this.getOrderDetails();
  };

  // function to get token from asyncstorage

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

  // function to call api of placed order details

  getOrderDetails = async () => {
    const {token} = this.state;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
    };

    this.setState({isLoading: true});

    request(
      this.getOrderDetailsCallback,
      null,
      'GET',
      API_URL.GET_ORDER_DETAILS_API,
      header,
    );
  };

  //  callback from api

  getOrderDetailsCallback = {
    success: response => {
      this.setState({
        placedOrderDetails: response.product_details,
        isLoading: false,
      });
    },
    error: error => {
      console.log(error);
    },
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#B4B4B4',
        }}
      />
    );
  };

  render() {
    const width = Dimensions.get('window').width;
    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {this.state.placedOrderDetails.length === 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <FaIcon size={98} name="frown-open" />
                </View>
                <Text style={{fontSize: 24, textAlign: 'center'}}>
                  Oooopsssss orders not found!!
                </Text>
              </View>
            ) : (
              <FlatList
                data={this.state.placedOrderDetails}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                ListFooterComponent={this.FlatListItemSeparator}
                renderItem={({item}) => {
                  let totalCost = item.product_details[0].total_cartCost;

                  let date = item.product_details[0].createdAt;

                  const orderDate = moment(date).format('MMMM D, YYYY');

                  return (
                    <View style={{width: width}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Order Id', {
                            orderData: item.product_details,
                            order_id: item.product_details[0].order_id,
                          });
                        }}>
                        <View style={styles.container}>
                          <View style={styles.orderText}>
                            <Text style={styles.idText}>Id : {item._id}</Text>
                          </View>

                          <View style={styles.costContainer}>
                            <Text style={styles.totalCost}>
                              {`Rs. ${totalCost}`}
                            </Text>
                          </View>

                          <View style={styles.orderDateContainer}>
                            <Text style={styles.orderDateText}>
                              {`Order Date :  ${orderDate}`}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

export default OrderList;

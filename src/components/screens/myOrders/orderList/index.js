import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL, request} from '../../../../config/api';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setOrderListData} from '../../../../redux/actions';

import moment from 'moment';
import styles from './styles';
import ModalLoader from '../../../custom/modalLoader/index';
import RenderOrderList from './renderOrderList';
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
      // console.log(response);
      const {setOrderListData} = this.props;
      setOrderListData(response.product_details);
      this.setState({isLoading: false});
    },
    error: error => {
      console.log(error);
      this.setState({isLoading: false});
    },
  };

  FlatListItemSeparator = () => {
    return <View style={styles.itemSeperator} />;
  };

  render() {
    const {orderList} = this.props;

    return (
      <View style={styles.mainContainer}>
        {this.state.isLoading ? (
          <ModalLoader isLoading={this.state.isLoading} />
        ) : null}
        <View style={styles.headerContainer}>
          {orderList.data.length === 0 ? (
            <View style={styles.emptyListContainer}>
              <View>
                <FaIcon size={98} name="frown-open" />
              </View>
              <Text style={styles.emptyListText}>
                Oooopsssss orders not found!!
              </Text>
            </View>
          ) : (
            <FlatList
              data={orderList.data}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              ListFooterComponent={this.FlatListItemSeparator}
              renderItem={({item}) => {
                let totalCost = item.product_details[0].total_cartCost;

                let date = item.product_details[0].createdAt;

                const orderDate = moment(date).format('MMMM D, YYYY');

                return (
                  <RenderOrderList
                    product_details={item.product_details}
                    order_id={item.product_details[0].order_id}
                    _id={item._id}
                    totalCost={totalCost}
                    orderDate={orderDate}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  orderList: state.orderList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setOrderListData,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderList);

import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../../../config/api';
export class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_data: [],
      loggedInData: [],

      customerData: {},
      quantity: '1',
    };
  }

  componentDidMount() {
    const {sendProdData} = this.props.route.params;

    this.setState({product_data: sendProdData});

    this.getData();
  }

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({
          loggedInData: value.customer_address[0],
          customerData: value.customer_details,
        });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  updateQuantity = () => {
    this.setState({quantity: quantity});
  };

  render() {
    const {product_data, customerData, loggedInData} = this.state;

    const userFullName = customerData.first_name + ' ' + customerData.last_name;

    const total_price = this.state.quantity * product_data.product_cost;

    console.log(loggedInData.address);

    return (
      <ScrollView>
        <View style={styles.userDetailContainer}>
          <View>
            <Text style={styles.userName}>{userFullName}</Text>
          </View>

          <View style={styles.userAddressContainer}>
            <Text style={styles.userAddress}>{loggedInData.address}</Text>
          </View>
          <View style={styles.changeAddressBTNcontainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Add Address');
              }}
              style={styles.changeAddressBTN}>
              <Text style={styles.changeAddressBTNtext}>
                Change Or Add Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.moduleSeperatorline} />

        <View style={styles.productDetailsContainer}>
          <View style={styles.productNameContainer}>
            <View style={styles.productNameDetailsContainer}>
              <Text style={styles.productName}>
                {this.state.product_data.product_name}
              </Text>
            </View>
            <View>
              <Image
                style={styles.productImage}
                source={{
                  uri: BASE_URL + product_data.product_image,
                }}
              />
            </View>
          </View>

          <View style={styles.productPriceDetailsContainer}>
            <View style={styles.productMaterialContainer}>
              <Text style={styles.productMaterial}>
                {product_data.product_material}
              </Text>
            </View>
            <View>
              <Text style={styles.productCost}>{'Rs' + ' ' + total_price}</Text>
            </View>
          </View>
          <View>
            <NumericInput
              value={this.state.quantity}
              onChange={quantity => this.setState({quantity})}
              totalWidth={200}
              totalHeight={40}
              iconSize={25}
              initValue={1}
              minValue={1}
              maxValue={20}
              step={1}
              valueType="real"
              rounded
              textColor="#B0228C"
              iconStyle={{color: 'white'}}
              rightButtonBackgroundColor="#EA3788"
              leftButtonBackgroundColor="#E56B70"
            />
          </View>
        </View>

        <View style={styles.moduleSeperatorline} />

        <View style={styles.footerContainer}>
          <View style={styles.footerPriceDetailsContainer}>
            <Text style={styles.footerPriceDetails}>Price Details</Text>
          </View>

          <View style={styles.productCostContainer}>
            <View style={{width: '50%'}}>
              <Text style={styles.productPrice}>Price</Text>
            </View>
            <View>
              <Text style={styles.productPrice}>
                {'Rs' + ' ' + total_price}
              </Text>
            </View>
          </View>

          <View style={styles.moduleSeperatorline} />

          <View style={styles.orderSummaryFooterContainer}>
            <View>
              <Text style={styles.productPrice}>
                {'Rs' + ' ' + total_price}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                style={styles.orderNowBTN}
                onPress={() => {
                  alert('hello');
                }}>
                <Text style={styles.orderNowBTNtext}>ORDER NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      // <View>
      //   <Text>jhsdkhskjdhkjshd</Text>
      // </View>
    );
  }
}

export default OrderSummary;

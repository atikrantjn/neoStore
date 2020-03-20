import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

import {BASE_URL} from '../../../config/api';
export class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_data: {},
    };
  }
  componentDidMount() {
    const {sendProdData} = this.props.route.params;

    this.setState({product_data: sendProdData});
  }
  render() {
    const {product_data} = this.state;

    return (
      <ScrollView>
        <View style={styles.userDetailContainer}>
          <View>
            <Text style={styles.userName}>Naveen Patel</Text>
          </View>

          <View style={styles.userAddressContainer}>
            <Text style={styles.userAddress}>
              Address kjdhbfjkhkjsdfb kjsdhdfkjh skjdhfkjhsdfkj kjshdkjfh
            </Text>
          </View>
          <View style={styles.changeAddressBTNcontainer}>
            <TouchableOpacity style={styles.changeAddressBTN}>
              <Text style={styles.changeAddressBTNtext}>
                Change Or Add Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.moduleSeperatorline}></View>

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
              <Text style={styles.productCost}>
                {'Rs' + ' ' + product_data.product_cost}
              </Text>
            </View>
          </View>
          {/* <View>
            <Dropdown label="select" data={dropData} />
          </View> */}
        </View>

        <View style={styles.moduleSeperatorline}></View>

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
                {'Rs' + ' ' + product_data.product_cost}
              </Text>
            </View>
          </View>

          <View style={styles.orderSummaryFooterContainer}>
            <View>
              <Text style={styles.productPrice}>
                {'Rs' + ' ' + product_data.product_cost}
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
    );
  }
}

export default OrderSummary;

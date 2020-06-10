import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {request, API_URL, BASE_URL} from '../../../../config/api';
import RenderCartItem from './renderCartItem';
import AsyncStorage from '@react-native-community/async-storage';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
export class MyCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartData: {},

      token: null,
    };
  }

  //cart data api function

  componentDidMount = async () => {
    // this.cartData();
    await this.getData();
    await this.getProductData();
  };

  getData = async () => {
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

  getProductData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('cart'));

      if (value !== null) {
        this.setState({cartData: value});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  FlatListItemSeparator = () => {
    return <View style={styles.itemSeperator} />;
  };

  //footer component for flatlist

  render() {
    return (
      <View>
        <View>
          {this.state.cartData.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <View>
                <FaIcon size={78} name="frown-open" />
              </View>
              <Text style={{fontSize: 24, textAlign: 'center'}}>
                Oooopsssss no product found in your cart!!
              </Text>
            </View>
          ) : (
            <FlatList
              data={this.state.cartData}
              ListFooterComponent={() => {
                return (
                  <View style={styles.footerComponentContainer}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                      <Text style={styles.footerPrice}>price</Text>
                      <Text>Total Cost : </Text>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={styles.footerOrderBTN}
                        onPress={() => {
                          alert('hello');
                        }}>
                        <Text style={styles.footerBTNtext}>ORDER NOW</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({item}) => {
                const productItem = JSON.parse(JSON.stringify(item));

                return (
                  <RenderCartItem
                    product_image={productItem.product_id.product_image}
                    product_name={productItem.product_id.product_name}
                    product_material={productItem.product_id.product_material}
                    product_cost={productItem.product_cost}
                  />
                );
              }}
              keyExtractor={(item, index) => index}
            />
          )}
        </View>

        <View>
          <Text>hdgfhgdf</Text>
        </View>
      </View>
    );
  }
}

export default MyCart;

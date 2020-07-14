import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';

import RenderCartItem from './renderCartItem';
import AsyncStorage from '@react-native-community/async-storage';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
export class MyCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartData: [],

      total_cost: '',

      token: null,
    };
  }

  componentDidMount = async () => {
    await this.getData();
    await this.getProductData();

    setInterval(this.getProductData, 1000);
  };

  // get user data from local storage

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

  // get cart data from local storage

  getProductData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('cartData'));

      if (value !== null) {
        this.setState({cartData: value});
        let arr = value.map(item => {
          return item.product_cost;
        });

        let totalCost = arr.reduce((a, b) => a + b, 0);

        this.setState({
          total_cost: totalCost,
        });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  FlatListItemSeparator = () => {
    return <View style={styles.itemSeperator} />;
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.cartData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View>
              <FaIcon size={88} name="frown-open" />
            </View>
            <Text style={styles.emptyText}>
              Oooopsssss Your cart is empty!!
            </Text>
          </View>
        ) : (
          <View style={styles.listMainContainer}>
            <FlatList
              data={this.state.cartData}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              ListFooterComponent={this.FlatListItemSeparator}
              renderItem={({item}) => {
                const productItem = JSON.parse(JSON.stringify(item));

                return (
                  <RenderCartItem
                    product_image={productItem.product_id.product_image}
                    product_name={productItem.product_id.product_name}
                    product_material={productItem.product_id.product_material}
                    product_cost={productItem.product_cost}
                    product_id={productItem._id}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        <View
          style={{borderBottomWidth: 3, height: 10, borderColor: '#D5D5D5'}}
        />
        <View style={styles.footerComponentContainer}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.footerPrice}>Total Price:</Text>
            <Text style={styles.footerPrice}>
              {'Rs.' + ' ' + this.state.total_cost}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('OrderSummary');
            }}>
            <View style={styles.footerOrderBTN}>
              <Text style={styles.footerBTNtext}>ORDER NOW</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MyCart;

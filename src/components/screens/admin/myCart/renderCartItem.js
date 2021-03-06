import React, {Component} from 'react';

import styles from './styles';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {BASE_URL} from '../../../../config/api';
import AsyncStorage from '@react-native-community/async-storage';

export class RenderCartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartData: {},
    };
  }

  //remove from cart

  removeFromCart = id => {
    const title = 'Time to choose!';
    const message = 'Are you sure you want to remove this item';
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

  removeItem = async id => {
    let data = JSON.parse(await AsyncStorage.getItem('cartData'));

    let cart = data.filter(item => {
      return item._id !== id;
    });

    AsyncStorage.setItem('cartData', JSON.stringify(cart)).then(() => {
      Alert.alert('Success', 'Item has been successfully removed');
    });
  };

  getProductData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('cartData'));

      if (value !== null) {
        this.setState({cartData: value});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  render() {
    const data = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: BASE_URL + data.product_image,
            }}
          />

          <View style={styles.productNameContainer}>
            <Text style={styles.productName}>{data.product_name}</Text>
            <Text style={styles.productMaterial}>
              ({data.product_material})
            </Text>
            <View style={styles.productCostContainer}>
              <Text style={styles.productCost}>
                {'Rs.' + ' ' + data.product_cost}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.removeBtnContainer}>
          <TouchableOpacity
            onPress={() => {
              this.removeFromCart(data.product_id);
            }}>
            <View style={styles.removeBTN}>
              <Text style={styles.removeBTNText}>Remove</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RenderCartItem;

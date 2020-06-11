import React, {Component} from 'react';

import styles from './styles';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {BASE_URL} from '../../../../config/api';
import AsyncStorage from '@react-native-community/async-storage';

export class RenderCartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartData: {},
    };
  }
  removeFromCart = id => {
    const title = 'Time to choose!';
    const message = 'are u sure u wanna remove this item';
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

  //remove from cart
  removeItem = async id => {
    console.log(id);
    let data = JSON.parse(await AsyncStorage.getItem('cart'));

    console.log(data);

    let cart = data.filter(item => {
      return item._id !== id;
    });
    AsyncStorage.setItem('cart', JSON.stringify(cart));

    this.getProductData();

    alert('item has been successfully removed');
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

  render() {
    const data = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity>
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
                  {data.product_material}
                </Text>

                <View style={styles.productCostContainer}>
                  <Text style={styles.productCost}>
                    {'Rs' + ' ' + data.product_cost}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.removeBTN}
                  onPress={() => {
                    this.removeFromCart(data.product_id);
                  }}>
                  <Text style={styles.removeBTNText}>remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default RenderCartItem;

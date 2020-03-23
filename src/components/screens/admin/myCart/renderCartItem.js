import React, {Component} from 'react';

import styles from './styles';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
export class RenderCartItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props;
    console.log('hello', data);
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
                <Text numberOfLines={1} style={styles.productName}>
                  {data.product_name}
                </Text>
                <Text numberOfLines={1} style={styles.productMaterial}>
                  {data.product_material}
                </Text>

                <View style={styles.productCostContainer}>
                  <Text style={styles.productCost}>
                    {'Rs' + ' ' + data.product_cost}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default RenderCartItem;

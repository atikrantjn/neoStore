import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from './styles';
import {BASE_URL} from '../../../../config/api';

class RenderOrderId extends Component {
  render() {
    const data = this.props;
    return (
      <View style={styles.renderContainer}>
        <Image
          style={styles.renderImageStyle}
          source={{
            uri: BASE_URL + data.product_image,
          }}
        />

        <View style={styles.renderProductNameContainer}>
          <Text style={styles.renderProductName}>{data.product_name}</Text>
          <Text style={styles.renderProductMaterial}>
            ({data.product_material})
          </Text>

          <View style={styles.renderProductCostContainer}>
            <Text style={styles.renderProductQty}>
              {'Quantity :' + ' ' + data.quantity}
            </Text>
            <Text style={styles.renderProductCost}>
              {'Rs.' + ' ' + data.product_cost}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default RenderOrderId;

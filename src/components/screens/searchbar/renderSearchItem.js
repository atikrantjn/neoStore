import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import StarRating from 'react-native-star-rating';
import {BASE_URL} from '../../../config/api';

class renderSearchItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props;
    return (
      <View style={styles.renderListContainer}>
        <TouchableOpacity
          style={styles.renderTouchable}
          onPress={() => {
            this.props.navigation.navigate('ProductDetails', {
              productId: data.product_id,
              product_name: data.product_name,
            });
          }}>
          <View style={styles.renderImageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: BASE_URL + data.product_image,
              }}
            />

            <View style={styles.productDetailContainer}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.listText}>
                {data.product_name}
              </Text>
              <Text numberOfLines={1} style={styles.listSubText}>
                {data.product_material}
              </Text>

              <View style={styles.productCostContainer}>
                <Text style={styles.productCost}>
                  {'Rs' + ' ' + data.product_cost}
                </Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={data.rating}
                  fullStarColor={'#CD9922'}
                  starSize={20}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default renderSearchItem;

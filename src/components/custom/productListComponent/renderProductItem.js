import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import StarRating from 'react-native-star-rating';
import {BASE_URL} from '../../../config/api';
export class RenderProductItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const data = this.props;

    return (
      <ScrollView>
        <View style={styles.listContainer}>
          <TouchableOpacity
            styles={styles.list}
            onPress={() => {
              this.props.navigation.navigate('ProductDetails', {
                productId: data.productId,
                title: data.product_name,
              });
            }}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: BASE_URL + data.product_image,
                }}
              />

              <View style={{flexDirection: 'column'}}>
                <Text numberOfLines={1} style={styles.listText}>
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
                    rating={data.product_rating}
                    fullStarColor={'#CD9922'}
                    starSize={20}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default RenderProductItem;

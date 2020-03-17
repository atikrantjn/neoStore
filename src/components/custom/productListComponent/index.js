import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles from './styles';
// import * as contants from '../../../utils/contants';
import StarRating from 'react-native-star-rating';

export default class ProductListModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    return fetch(
      'http://180.149.241.208:3022/commonProducts?category_id=' + this.props.id,
    )
      .then(res => res.json())
      .then(response => {
        this.setState({data: response.product_details});
      })
      .catch(error => {
        console.log(error);
      });
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#B4B4B4',
        }}
      />
    );
  };
  render() {
    const deviceWidth = Dimensions.get('window').width;

    return (
      <View>
        <FlatList
          data={this.state.data}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => {
            return (
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    margin: 10,
                  }}>
                  <TouchableOpacity
                    styles={styles.list}
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetails', {
                        productId: item.product_id,
                      });
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 10,
                        width: deviceWidth,
                      }}>
                      <Image
                        style={{width: 120, height: 120}}
                        source={{
                          uri:
                            'http://180.149.241.208:3022/' + item.product_image,
                        }}
                      />

                      <View style={{flexDirection: 'column'}}>
                        <Text numberOfLines={1} style={styles.listText}>
                          {item.product_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.listSubText}>
                          {item.product_material}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: 15,
                          }}>
                          <Text style={styles.productCost}>
                            {'Rs' + ' ' + item.product_cost}
                          </Text>
                          <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={item.product_rating}
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
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

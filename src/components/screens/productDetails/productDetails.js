import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Alert,
} from 'react-native';

import StarRating from 'react-native-star-rating';
import axios from 'axios';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {request, API_URL} from '../../../config/api';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: {},
      subImages: [],
      categoryName: [],

      modalVisible: false,
      starCount: null,

      product_id: '',

      userToken: '',

      quantity: 1,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    const {productId} = this.props.route.params;
    const url = 'http://180.149.241.208:3022/getProductByProdId/' + productId;
    this.setState({
      product_id: productId,
    });

    axios.get(url).then(res => {
      this.setState({
        productData: res.data.product_details[0],
        categoryName: res.data.product_details[0].category_id,
        subImages: res.data.product_details[0].subImages_id,
      });
    });
  }

  updateRating() {
    // this.getData();

    const data = {
      product_id: this.state.product_id,
      product_rating: this.state.starCount,
    };

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjc1LCJpYXQiOjE1ODQ2MjEyNTF9.ND-nQ9tqQlIZHNGstw1QvhIW8kO8FAwSSPKygHjUT7w',
    };

    request(
      this.ratingCallback,
      data,
      'PUT',
      API_URL.UPDATE_RATING_API,
      header,
    );
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  ratingCallback = {
    success: response => {
      Alert.alert('thank you for rating our product');
    },
    error: error => {
      console.log('errr', error);
    },
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // value previously stored
        this.setState({userToken: value});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  //add product to cart to cart

  addToCart() {
    const data = {
      product_id: this.state.product_id,
      quantity: this.state.quantity,
    };
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjc1LCJpYXQiOjE1ODQ2MjEyNTF9.ND-nQ9tqQlIZHNGstw1QvhIW8kO8FAwSSPKygHjUT7w',
    };
    request(
      this.addToCartCallBack,
      data,
      'POST',
      API_URL.ADD_TO_CART_API,
      header,
    );
  }

  addToCartCallBack = {
    success: response => {
      Alert.alert('product added to cart successfully');
    },
    error: error => {
      console.log('errr', error);
    },
  };

  render() {
    const {productData} = this.state;

    return (
      <View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'space-evenly',
              borderBottomWidth: 2,
              borderBottomColor: '#D5D5D5',
            }}>
            <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
              <Text style={{fontSize: 35}}>{productData.product_name}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
              <Text style={{fontSize: 25}}>
                Category-{this.state.categoryName.category_name}
              </Text>
            </View>

            <View style={{marginTop: 22}}>
              <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                  this.setModalVisible(false);
                }}
                visible={this.state.modalVisible}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 300,
                      width: '75%',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#fff',
                      backgroundColor: '#DBB4B4',
                    }}>
                    <Text style={{fontSize: 35, textAlign: 'center'}}>
                      {productData.product_name}
                    </Text>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          width: '50%',
                          height: '70%',
                        }}
                        source={{
                          uri:
                            'http://180.149.241.208:3022/' +
                            productData.product_image,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <StarRating
                        halfStarEnabled={true}
                        disabled={false}
                        rating={this.state.starCount}
                        maxStars={5}
                        fullStarColor={'#CD9922'}
                        starSize={30}
                        selectedStar={rating => this.onStarRatingPress(rating)}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        this.updateRating();
                      }}
                      style={{
                        borderRadius: 7,
                        backgroundColor: '#fe3f3f',
                        width: '100%',
                        height: 40,
                        marginTop: 15,
                      }}>
                      <Text style={{textAlign: 'center', fontSize: 25}}>
                        Rate Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <View>
                <Text style={{fontSize: 20}}>
                  {productData.product_material}
                </Text>
              </View>
              <View>
                <StarRating
                  rating={productData.product_rating}
                  disabled={false}
                  maxStars={5}
                  fullStarColor={'#CD9922'}
                  starSize={20}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              height: 400,
              margin: 15,
              borderBottomWidth: 2,
              borderBottomColor: '#D5D5D5',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontSize: 35, color: 'red'}}>
                  Rs. {productData.product_cost}
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <FaIcon name="share-alt" size={35} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{
                  width: '50%',
                  height: '70%',
                }}
                source={{
                  uri:
                    'http://180.149.241.208:3022/' + productData.product_image,
                }}
              />
            </View>
            {/* <View style={{height: 250}}>
              <FlatList
                horizontal
                data={}
                renderItem={({item}) => {
                  return (
                    <Image source={item} style={{height: 80, width: 80}} />
                  );
                }}
                keyExtractor={item => item.id}
              />
            </View> */}
          </View>
          <View style={{flex: 1, margin: 15, flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 35}}>Description</Text>
              <TouchableOpacity
                onPress={() => {
                  this.addToCart();
                }}
                style={{flex: 1, alignItems: 'flex-end', marginRight: 35}}>
                <FaIcon name="cart-plus" size={50} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: 18}}>{productData.product_desc}</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: 15,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('OrderSummary', {
                  sendProdData: productData,
                });
              }}
              style={{
                borderRadius: 7,
                backgroundColor: 'red',
                width: 150,
                height: 50,
              }}>
              <Text style={{textAlign: 'center', fontSize: 30, color: 'white'}}>
                Buy Now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 7,
                backgroundColor: '#B7B7B7',
                width: 150,
                height: 50,
              }}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={{textAlign: 'center', fontSize: 30}}>Rate </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

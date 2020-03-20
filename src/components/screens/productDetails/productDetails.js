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
import styles from './styles';
import {BASE_URL} from '../../../config/api';

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
          <View style={styles.container}>
            <View style={styles.productNameContainer}>
              <Text style={styles.productName}>{productData.product_name}</Text>
            </View>
            <View style={styles.categoryNameContainer}>
              <Text style={styles.categoryName}>
                Category-{this.state.categoryName.category_name}
              </Text>
            </View>

            <View style={styles.modalMainContainer}>
              <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                  this.setModalVisible(false);
                }}
                visible={this.state.modalVisible}>
                <View style={styles.modalDetailsContainer}>
                  <View style={styles.modalProductNameContainer}>
                    <Text style={styles.modalProductName}>
                      {productData.product_name}
                    </Text>

                    <View style={styles.modalImageContainer}>
                      <Image
                        style={styles.modalImage}
                        source={{
                          uri: BASE_URL + productData.product_image,
                        }}
                      />
                    </View>

                    <View style={styles.modalStarContainer}>
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
                      style={styles.modalUpdateRatingBTN}>
                      <Text style={{textAlign: 'center', fontSize: 25}}>
                        Rate Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.productDetailsContainer}>
              <View>
                <Text style={styles.productMaterial}>
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

          <View style={styles.productCostContainer}>
            <View style={styles.productCostRow}>
              <View>
                <Text style={styles.productCost}>
                  Rs. {productData.product_cost}
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <FaIcon name="share-alt" size={35} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productImageContainer}>
              <Image
                style={styles.productImage}
                source={{
                  uri: BASE_URL + productData.product_image,
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
          <View style={styles.productDescriptionContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.descriptionText}>Description</Text>
              <TouchableOpacity
                onPress={() => {
                  this.addToCart();
                }}
                style={styles.addToCartIcon}>
                <FaIcon name="cart-plus" size={50} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.productDescription}>
                {productData.product_desc}
              </Text>
            </View>
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('OrderSummary', {
                  sendProdData: productData,
                });
              }}
              style={styles.buyNowBTN}>
              <Text style={styles.buyNowBTNtext}>Buy Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rateNowBTN}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text style={styles.rateNowBTNtext}>Rate </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

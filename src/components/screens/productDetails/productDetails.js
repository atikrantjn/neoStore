import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import styles from './styles';

import StarRating from 'react-native-star-rating';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {request, API_URL, BASE_URL} from '../../../config/api';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: [],
      subImages: [],
      categoryName: [],

      modalVisible: false,
      starCount: 0,

      product_id: '',

      token: '',

      quantity: 1,
      cartCount: 1,

      buttonDisabled: true,
      buyNowbtn: true,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount = async () => {
    await this.getToken();
    const {productId} = this.props.route.params;

    this.setState({
      product_id: productId,
    });

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = null;

    request(
      this.productDetailsCallBack,
      data,
      'GET',
      API_URL.PRODUCT_DETAILS_API + productId,
      header,
    );
  };

  productDetailsCallBack = {
    success: response => {
      const pr = JSON.parse(JSON.stringify(response.product_details));

      this.setState({
        productData: pr[0],
        productImg: pr[0].product_image,
        categoryName: pr[0].category_id,
        subImages: pr[0].subImages_id.product_subImages,
      });
    },
    error: error => {
      console.log('errrbsdjgjhghjcgvjh', error);
    },
  };

  // rating update function

  updateRating() {
    const {token} = this.state;

    const data = {
      product_id: this.state.product_id,
      product_rating: this.state.starCount,
    };

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + token,
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
      buttonDisabled: false,
    });
  }

  ratingCallback = {
    success: response => {
      Alert.alert('thank you for rating our product');
      this.setState({modalVisible: false});
    },
    error: error => {
      Alert.alert('please login first');
    },
  };

  getToken = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      console.log(value);

      if (value !== null) {
        this.setState({token: value.token, buyNowbtn: false});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  //add product to cart

  addToCart = async (id, productData) => {
    // try {
    let mainData = {
      _id: productData._id,
      product_id: productData,
      product_cost: productData.product_cost,
      quantity: 1,
    };

    const existingProducts = await AsyncStorage.getItem('cart');

    let newProduct = JSON.parse(existingProducts);

    if (!newProduct) {
      newProduct = [];
      newProduct.push(mainData);

      AsyncStorage.setItem('cart', JSON.stringify(newProduct))
        .then(() => {
          alert('product added to cart successfully');
        })
        .catch(() => {
          alert('There was an error saving the product');
        });
    } else {
      let existed_item = newProduct.find(item => id === item._id);
      if (existed_item) {
        alert('product already exist');
      } else {
        newProduct.push(mainData);
        AsyncStorage.setItem('cart', JSON.stringify(newProduct));

        this.setState({cartCount: 1});
        alert('product added to cart successfully');

        this.setState({cartCount: this.state.cartCount + 1});
      }
    }
  };

  //subimage click

  onpressSubImage = async id => {
    this.setState({productImg: id});
  };

  render() {
    const {productData} = this.state;

    const {product_id} = this.state;

    const {productImg} = this.state;

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
                          uri: BASE_URL + productImg,
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
                      disabled={this.state.buttonDisabled}
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
                  uri: BASE_URL + productImg,
                }}
              />
            </View>

            {/* subimages */}

            <FlatList
              horizontal
              data={this.state.subImages}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.onpressSubImage(item);
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <View style={{borderWidth: 1, borderColor: 'black'}}>
                      <Image
                        style={{width: 110, height: 120}}
                        source={{uri: BASE_URL + item}}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={styles.productDescriptionContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.descriptionText}>Description</Text>
              <TouchableOpacity
                onPress={() => {
                  this.addToCart(product_id, productData);
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
              disabled={this.state.buyNowbtn}
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

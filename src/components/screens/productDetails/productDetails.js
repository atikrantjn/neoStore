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
import IonIcon from 'react-native-vector-icons/Ionicons';
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
      starCount: null,

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
    const {productId, product_name} = this.props.route.params;

    this.setState({
      product_id: productId,
    });
    await this.getToken();

    await this.getProductDetails();
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

  getProductDetails = () => {
    const {productId} = this.props.route.params;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    request(
      this.productDetailsCallBack,
      null,
      'GET',
      API_URL.PRODUCT_DETAILS_API + productId,
      header,
    );
  };

  // rating update function

  updateRating() {
    const {token} = this.state;

    const data = {
      product_id: this.state.product_id,
      product_rating: this.state.starCount,
      // product_rating: this.state.rating,
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

  ratingCallback = {
    success: response => {
      //  console.log(response);
      Alert.alert('success', 'thank you for rating our product');
      this.setState({modalVisible: false});
    },
    error: error => {
      Alert.alert('Error', 'please login first');
      console.log('err', error);
    },
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
      buttonDisabled: false,
    });
  }

  getToken = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

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

    const existingProducts = await AsyncStorage.getItem('cartData');

    let newProduct = JSON.parse(existingProducts);

    if (!newProduct) {
      newProduct = [];
      newProduct.push(mainData);

      AsyncStorage.setItem('cartData', JSON.stringify(newProduct))
        .then(() => {
          Alert.alert('success', 'product added to cart successfully');
        })
        .catch(() => {
          Alert.alert('Error', 'There was an error saving the product');
        });
    } else {
      let existed_item = newProduct.find(item => id === item._id);
      if (existed_item) {
        Alert.alert('Error', 'product already exist');
      } else {
        newProduct.push(mainData);
        AsyncStorage.setItem('cartData', JSON.stringify(newProduct));

        this.setState({cartCount: 1});
        Alert.alert('Success', 'product added to cart successfully');

        this.setState({cartCount: this.state.cartCount + 1});
      }
    }
  };

  //subimage click

  onpressSubImage = async id => {
    this.setState({productImg: id});
  };

  //updating component on recieving new props

  componentDidUpdate = async prev => {
    let product_id = prev.route.params.productId;
    let prevProd = this.props.route.params.productId;

    if (prevProd !== product_id) {
      await this.getProductDetails();
      // this.setState({product_id: prevProd});
    }
  };

  ratingModule = () => {
    const {productData, productImg} = this.state;
    return (
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
                  resizeMode="contain"
                  style={styles.modalImage}
                  source={{
                    uri: BASE_URL + productImg,
                  }}
                />
              </View>

              <View style={styles.modalStarContainer}>
                <StarRating
                  starStyle={styles.modalStarStyle}
                  halfStarEnabled={true}
                  disabled={false}
                  rating={parseFloat(this.state.starCount)}
                  maxStars={5}
                  fullStarColor={'#CD9922'}
                  starSize={30}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.updateRating();
                }}>
                <View style={styles.modalUpdateRatingBTN}>
                  <Text style={styles.modalRateNowText}>RATE NOW</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(false);
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                backgroundColor: '#06060694',
              }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  render() {
    const {productData, product_id, productImg} = this.state;

    return (
      <View style={[styles.mainContainer]}>
        <ScrollView>
          <View style={styles.container}>
            <View style={{margin: 15, flex: 1}}>
              <View style={styles.productNameContainer}>
                <Text style={styles.productName}>
                  {productData.product_name}
                </Text>
              </View>
              <View style={styles.categoryNameContainer}>
                <Text style={styles.categoryName}>
                  Category-{this.state.categoryName.category_name}
                </Text>
              </View>

              <View style={styles.productDetailsContainer}>
                <View>
                  <Text style={styles.productMaterial}>
                    {productData.product_material}
                  </Text>
                </View>
                <View>
                  <StarRating
                    rating={parseFloat(productData.product_rating)}
                    disabled={false}
                    maxStars={5}
                    fullStarColor={'#CD9922'}
                    starSize={20}
                  />
                </View>
              </View>
            </View>
          </View>

          {this.state.modalVisible ? this.ratingModule() : null}

          <View style={styles.productCostContainer}>
            <View style={styles.productCostRow}>
              <View>
                <Text style={styles.productCost}>
                  Rs. {productData.product_cost}
                </Text>
              </View>
              <View>
                <TouchableOpacity>
                  <FaIcon
                    name="share-alt"
                    size={28}
                    style={{color: '#989898'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productImageContainer}>
              <Image
                resizeMode="contain"
                style={styles.productImage}
                source={{
                  uri: BASE_URL + productImg,
                }}
              />
            </View>

            {/* subimages */}
            <View style={{marginHorizontal: 5}}>
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
                          resizeMode="contain"
                          style={{width: 110, height: 120}}
                          source={{uri: BASE_URL + item}}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>

          <View style={styles.moduleSeperatorline} />

          <View style={styles.productDescriptionContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.descriptionText}>Description</Text>
              <TouchableOpacity
                onPress={() => {
                  this.addToCart(product_id, productData);
                }}
                style={styles.addToCartIcon}>
                <IonIcon
                  name="md-cart"
                  size={20}
                  style={{
                    backgroundColor: '#3089AB',
                    color: 'white',
                    borderRadius: 25,
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.productDescription}>
                {productData.product_desc}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.moduleSeperatorline} />

        <View style={styles.footerContainer}>
          <TouchableOpacity
            disabled={this.state.buyNowbtn}
            onPress={() => {
              this.props.navigation.navigate('OrderSummary');
            }}>
            <View style={styles.buyNowBTN}>
              <Text style={styles.buyNowBTNtext}>BUY NOW</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <View style={styles.rateNowBTN}>
              <Text style={styles.rateNowBTNtext}>RATE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

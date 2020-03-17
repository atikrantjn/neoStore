import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  TouchableHighlight,
} from 'react-native';
import images from '../../../utils/images';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productData: {},
      subImages: [],
      categoryName: [],

      modalVisible: false,
      starCount: '',
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    const {productId} = this.props.route.params;
    const url = 'http://180.149.241.208:3022/getProductByProdId/' + productId;

    axios.get(url).then(res => {
      this.setState({
        productData: res.data.product_details[0],
        categoryName: res.data.product_details[0].category_id,
        subImages: res.data.product_details[0].subImages_id,
      });
    });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    const {productData} = this.state;
    // const {subImages} = this.state;

    // console.log('subimages', this.state.subImages);

    // subImages.product_subImages.map(val => {
    //   console.log('value', val);
    // });

    console.log(this.state.starCount);

    return (
      <View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'space-evenly',
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
            <View>
              <Text style={{fontSize: 35}}>Description</Text>
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

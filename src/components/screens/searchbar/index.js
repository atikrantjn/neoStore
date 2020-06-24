import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import StarRating from 'react-native-star-rating';

import {BASE_URL, request, API_URL} from '../../../config/api';

class SearchBarHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBarFocused: false,
      searchText: '',
    };
  }

  componentDidMount() {
    this.keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.KeyboardWillShow = Keyboard.addListener(
      'KeyboardWillShow',
      this.KeyboardWillShow,
    );
    this.keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );
  }

  keyboardDidShow = () => {
    this.setState({
      searchBarFocused: true,
    });
  };

  KeyboardWillShow = () => {
    this.setState({
      searchBarFocused: true,
    });
  };

  keyboardWillHide = () => {
    this.setState({
      searchBarFocused: false,
    });
  };

  searchData = () => {
    const text = this.state.searchText;
    const postData = null;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    request(
      this.searchCallback,
      postData,
      'GET',
      API_URL.GET_PRODUCT_BY_SEARCH_API + text,
      header,
    );
  };

  searchCallback = {
    success: resp => {
      console.log('resp.....', resp);
      this.setState({searchedData: resp.product_details});
    },
    error: err => {
      console.log('err.....', err);
    },
  };

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
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.searchContainer}>
            <Icons
              name={
                this.state.searchBarFocused ? 'md-arrow-back' : 'ios-search'
              }
              style={{fontSize: 27}}
            />
            <TextInput
              autoCapitalize="characters"
              onChangeText={searchText => {
                this.setState({
                  searchText: searchText,
                });
              }}
              placeholder="search"
              style={{fontSize: 20, marginLeft: 13, flex: 1}}
              onSubmitEditing={() => {
                this.searchData();
              }}
            />
          </View>
        </View>

        <View>
          <FlatList
            data={this.state.searchedData}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({item}) => {
              let rating = parseFloat(item.product_rating);
              //console.log(item.product_id);

              return (
                <View style={styles.listContainer}>
                  <TouchableOpacity
                    styles={styles.list}
                    onPress={() => {
                      this.props.navigation.navigate('ProductDetails', {
                        productId: item.product_id,
                      });
                    }}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: BASE_URL + item.product_image,
                        }}
                      />

                      <View style={{flexDirection: 'column'}}>
                        <Text numberOfLines={1} style={styles.listText}>
                          {item.product_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.listSubText}>
                          {item.product_material}
                        </Text>

                        <View style={styles.productCostContainer}>
                          <Text style={styles.productCost}>
                            {'Rs' + ' ' + item.product_cost}
                          </Text>
                          <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={rating}
                            fullStarColor={'#CD9922'}
                            starSize={20}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default SearchBarHeader;

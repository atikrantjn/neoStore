import React, {Component} from 'react';
import {Text, View, Keyboard, FlatList, ActivityIndicator} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {InputAutoSuggest} from 'react-native-autocomplete-search';

import RenderSearchItem from './renderSearchItem';

import {request, API_URL} from '../../../config/api';

class SearchBarHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBarFocused: false,
      searchText: '',
      empty: false,
      isLoading: false,
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

  // function to handle search data

  searchData = text => {
    // const text = this.state.searchText;

    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    this.setState({isLoading: true});

    if (text === '') {
      this.setState({empty: true, isLoading: false});
    }

    request(
      this.searchCallback,
      null,
      'GET',
      API_URL.GET_PRODUCT_BY_SEARCH_API + text,
      header,
    );
  };

  // callback from search data api

  searchCallback = {
    success: resp => {
      if (resp.success) {
        this.setState({
          searchedData: resp.product_details,
          empty: false,
          isLoading: false,
        });
      } else {
        this.setState({empty: true, isLoading: false});
      }
    },
    error: err => {
      if (err.success === false) {
        this.setState({empty: true, isLoading: false});
      }
    },
  };

  FlatListItemSeparator = () => {
    return <View style={styles.itemSeperator} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.iconContainer}>
              <Icons
                onPress={() => {
                  this.state.searchBarFocused
                    ? this.props.navigation.goBack(null)
                    : null;
                }}
                name={
                  this.state.searchBarFocused ? 'md-arrow-back' : 'ios-search'
                }
                style={styles.iconStyle}
              />
            </View>

            <View style={styles.inputContainerStyle}>
              <InputAutoSuggest
                inputStyle={styles.inputStyle}
                apiEndpointSuggestData={text => this.searchData(text)}
              />
            </View>
          </View>
        </View>

        {this.state.isLoading ? (
          <ActivityIndicator
            style={styles.spinnerStyle}
            size={28}
            color="blue"
          />
        ) : null}

        <View style={styles.mainContainerStyle}>
          {this.state.empty ? (
            <View style={styles.emptyListStyle}>
              <View>
                <FaIcon size={98} name="frown-open" />
              </View>
              <Text style={styles.emptyListText}>
                Oooopsssss Data not found!!
              </Text>
            </View>
          ) : (
            <FlatList
              data={this.state.searchedData}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({item}) => {
                let rating = parseFloat(item.product_rating);

                return (
                  <RenderSearchItem
                    {...this.props}
                    product_id={item.product_id}
                    product_name={item.product_name}
                    product_image={item.product_image}
                    product_material={item.product_material}
                    product_cost={item.product_cost}
                    rating={rating}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>
    );
  }
}

export default SearchBarHeader;

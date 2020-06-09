import React, {Component} from 'react';
import {Text, View, TextInput, Keyboard} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import {request, API_URL} from '../../../config/api';

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
      console.log('resp.....', resp.product_details[0]);
    },
    error: err => {
      console.log('err.....', err);
    },
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
              onChangeText={searchText => {
                this.setState({
                  searchText: searchText,
                });
                console.log(this.state.searchText);
              }}
              placeholder="search"
              style={{fontSize: 20, marginLeft: 13, flex: 1}}
              onSubmitEditing={() => {
                this.searchData();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default SearchBarHeader;

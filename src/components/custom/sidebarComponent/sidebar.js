import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../utils/images';
import EnIcon from 'react-native-vector-icons/Entypo';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerContentScrollView} from '@react-navigation/drawer';

import {List} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

import {BASE_URL, api, API_URL} from '../../../config/api';

import AsyncStorage from '@react-native-community/async-storage';
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      isloggedIn: false,
      token: '',
      data: {},
      cartData: [],
      isLoading: false,
    };
  }

  getProductData = async () => {
    try {
      let value = JSON.parse(await AsyncStorage.getItem('cartData'));

      if (value !== null) {
        this.setState({cartData: value});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  removeValue = async () => {
    const {token} = this.state;

    let data = this.state.cartData;

    let flag = [{flag: 'logout'}];
    let data1 = [...data, ...flag];

    this.setState({isLoading: true});

    api
      .fetchapi(
        BASE_URL + API_URL.ADD_PRODUCT_CHECKOUT_API,
        'post',
        JSON.stringify(data1),
        token,
      )

      .then(response => response.json())
      .then(async respData => {
        if (respData.success) {
          // await AsyncStorage.removeItem('userData');
          // await AsyncStorage.removeItem('cartData');

          await AsyncStorage.clear();

          Alert.alert('Success', respData.message, [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('Admin');
              },
            },
          ]);
        } else {
          Alert.alert('Error', respData.message);
        }
      });
  };

  logoutHandler = () => {
    const title = 'Logout!!';
    const message = 'Are you sure you want to logout';
    const buttons = [
      {text: 'Cancel', type: 'cancel'},
      {
        text: 'yes',
        onPress: async () => {
          await this.removeValue();
          this.setState({isloggedIn: false});

          this.props.navigation.navigate('Home');
        },
      },
    ];
    Alert.alert(title, message, buttons);
  };

  _handlePress = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({
          isloggedIn: true,
          data: value.customer_details,
          token: value.token,
        });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  async componentDidMount() {
    await this.getData();
    await this.getProductData();

    // setInterval(this.getData, 2000);
  }

  componentDidUpdate = prev => {
    if (prev.state.routes !== this.props.state.routes) {
      this.getData();
    }
  };

  render(props) {
    const {profile_img} = this.state.data;

    return (
      <View style={styles.sideMenuContainer}>
        {this.state.isloggedIn === true ? (
          <View style={styles.mainContainer}>
            {profile_img === null ? (
              <Image
                source={images.userIcon}
                style={styles.sideMenuProfileIcon}
              />
            ) : (
              <Image
                source={{
                  uri: BASE_URL + profile_img,
                }}
                style={styles.sideMenuProfileIcon}
              />
            )}

            <Text style={styles.fullNameText}>
              {this.state.data.first_name + ' ' + this.state.data.last_name}
            </Text>
            <Text style={styles.emailText}>{this.state.data.email}</Text>
          </View>
        ) : (
          <View style={styles.sideImageContainer}>
            <Image
              source={images.sideDrawerImage}
              style={styles.sideMenuProfileIconLog}
            />
          </View>
        )}
        {this.state.isloggedIn ? (
          <View style={styles.sideContainer_1} />
        ) : (
          <View style={styles.sideContainer_2} />
        )}

        <DrawerContentScrollView
          {...props}
          style={styles.drawerScrollViewStyle}>
          {!this.state.isloggedIn === true ? (
            <List.Accordion
              titleStyle={styles.accountTitleStyle}
              title="Account"
              left={() => <EnIcon name="users" size={22} />}>
              <View style={styles.loginRegisterContainer}>
                <List.Item
                  titleStyle={styles.loginRegisterTextStyle}
                  title="Login"
                  left={() => (
                    <FaIcon
                      name="user"
                      size={18}
                      style={styles.loginRegisterIconStyle}
                    />
                  )}
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}
                />
                <List.Item
                  titleStyle={styles.loginRegisterTextStyle}
                  title="Register"
                  left={() => (
                    <AntDesign
                      name="adduser"
                      size={18}
                      style={styles.loginRegisterIconStyle}
                    />
                  )}
                  onPress={() => {
                    this.props.navigation.navigate('Register');
                  }}
                />
              </View>
            </List.Accordion>
          ) : null}

          {this.state.isloggedIn ? (
            <View>
              <List.Item
                titleStyle={styles.listTitleStyle}
                title="My Cart"
                left={() => (
                  <EnIcon
                    name="shopping-cart"
                    size={22}
                    style={styles.listIconStyle}
                  />
                )}
                onPress={() => {
                  this.props.navigation.navigate('MyCart');
                }}
              />
              <List.Item
                titleStyle={styles.listTitleStyle}
                title="Add Address"
                onPress={() => {
                  this.props.navigation.navigate('Add Address');
                }}
                left={() => (
                  <EnIcon
                    name="location-pin"
                    size={22}
                    style={styles.listIconStyle}
                  />
                )}
              />

              <List.Item
                titleStyle={styles.listTitleStyle}
                title="My Account"
                left={() => (
                  <MaterialIcon
                    name="dashboard"
                    size={22}
                    style={styles.listIconStyle}
                  />
                )}
                onPress={() => {
                  this.props.navigation.navigate('My Account');
                }}
              />
              <List.Item
                titleStyle={styles.listTitleStyle}
                title="My Orders"
                left={() => (
                  <EnIcon
                    name="shopping-cart"
                    size={22}
                    style={styles.listIconStyle}
                  />
                )}
                onPress={() => {
                  this.props.navigation.navigate('My Orders');
                }}
              />
            </View>
          ) : null}

          <List.Accordion
            titleStyle={styles.productTitleStyle}
            title="Products"
            left={() => <FaIcon name="sitemap" size={22} />}>
            <List.Item
              titleStyle={styles.loginRegisterTextStyle}
              title="Bed"
              left={() => (
                <FaIcon name="bed" size={22} style={styles.productIconStyle} />
              )}
              onPress={() => {
                this.props.navigation.navigate('Bed', {
                  id: '5cfe3c65ea821930af69281f',
                  categoryName: 'Bed',
                });
              }}
            />
            <List.Item
              titleStyle={styles.loginRegisterTextStyle}
              onPress={() => {
                this.props.navigation.navigate('Sofa', {
                  id: '5cfe3c5aea821930af69281e',
                  categoryName: 'Sofa',
                });
              }}
              title="Sofa"
              left={() => (
                <FaIcon
                  name="couch"
                  size={22}
                  style={styles.productIconStyle}
                />
              )}
            />
            <List.Item
              titleStyle={styles.loginRegisterTextStyle}
              title="Table"
              left={() => (
                <FaIcon
                  name="table"
                  size={22}
                  style={styles.productIconStyle}
                />
              )}
              onPress={() => {
                this.props.navigation.navigate('Table', {
                  id: '5cfe3c79ea821930af692821',
                  categoryName: 'Table',
                });
              }}
            />
            <List.Item
              titleStyle={styles.loginRegisterTextStyle}
              title="Chair"
              left={() => (
                <FaIcon
                  name="chair"
                  size={22}
                  style={styles.productIconStyle}
                />
              )}
              onPress={() => {
                this.props.navigation.navigate('Chair', {
                  id: '5cfe3c6fea821930af692820',
                  categoryName: 'Chair',
                });
              }}
            />
            <List.Item
              titleStyle={styles.loginRegisterTextStyle}
              title="Almirah"
              left={() => (
                <MaIcon
                  name="file-cabinet"
                  size={22}
                  style={styles.productIconStyle}
                />
              )}
              onPress={() => {
                this.props.navigation.navigate('Almirah', {
                  id: '5d14c15101ae103e6e94fbe0',
                  categoryName: 'Almirah',
                });
              }}
            />
          </List.Accordion>

          <List.Item
            titleStyle={styles.storeLocatorTitle}
            title="Store locator"
            onPress={() => {
              this.props.navigation.navigate('Store Locator');
            }}
            left={() => (
              <EnIcon
                name="location-pin"
                size={22}
                style={styles.listIconStyle}
              />
            )}
          />
          {this.state.isloggedIn === true ? (
            <TouchableOpacity
              style={styles.logoutBtnContainer}
              onPress={() => {
                this.logoutHandler();
              }}>
              <View style={styles.customBtnBG}>
                <Text style={styles.customBtnText}>LOGOUT</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </DrawerContentScrollView>
      </View>
    );
  }
}

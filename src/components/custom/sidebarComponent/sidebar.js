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

import {BASE_URL, apiii} from '../../../config/api';

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

    console.log(data1);

    this.setState({isLoading: true});

    apiii
      .fetchapi(
        'http://160.149.241.208:3022/addProductToCartCheckout',
        'post',
        JSON.stringify(data1),
        token,
      )

      .then(response => response.json())
      .then(respData => {
        console.log(respData);
        let keys = ['userData', 'cartData'];

        if (respData.success) {
          Alert.alert(respData.message);

          AsyncStorage.multiRemove(keys, err => {
            this.setState({cartData: []});

            this.props.navigation.navigate('Home');
          });
        } else {
          Alert.alert(respData.message);
        }
      });
  };

  logoutHandler = () => {
    const title = 'Time to choose!';
    const message = 'are u sure u wanna logout';
    const buttons = [
      {text: 'Cancel', type: 'cancel'},
      {
        text: 'yes',
        onPress: async () => {
          await this.removeValue();
          this.setState({isloggedIn: false});
          setTimeout(() => {
            this.props.navigation.navigate('Home');
          }, 2000);
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

    setInterval(this.getData, 2000);
  }

  render(props) {
    const {profile_img} = this.state.data;

    return (
      <View style={styles.sideMenuContainer}>
        {this.state.isloggedIn === true ? (
          <View style={{flexDirection: 'column'}}>
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

            <Text style={{textAlign: 'center', fontSize: 20}}>
              {this.state.data.first_name + ' ' + this.state.data.last_name}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              {this.state.data.email}
            </Text>
          </View>
        ) : (
          <View style={{flexDirection: 'column'}}>
            <Image
              source={images.sideDrawerImage}
              style={styles.sideMenuProfileIconLog}
            />
          </View>
        )}
        {this.state.isloggedIn ? (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#e2e2e2',
              marginVertical: 25,
            }}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#e2e2e2',
            }}
          />
        )}

        <DrawerContentScrollView {...props} style={{marginHorizontal: 15}}>
          {!this.state.isloggedIn === true ? (
            <List.Accordion
              titleStyle={{fontSize: 18, marginLeft: 25, color: 'black'}}
              title="Account"
              left={() => <EnIcon name="users" size={22} />}>
              <View style={{justifyContent: 'center'}}>
                <List.Item
                  titleStyle={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginLeft: 25,
                  }}
                  title="Login"
                  left={() => <FaIcon name="user" size={20} />}
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}
                />
                <List.Item
                  titleStyle={{
                    fontSize: 18,
                    fontWeight: '500',
                    marginLeft: 25,
                  }}
                  title="Register"
                  left={() => <AntDesign name="adduser" size={20} />}
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
                titleStyle={{fontSize: 20}}
                title="My Cart"
                left={() => (
                  <EnIcon
                    name="shopping-cart"
                    size={22}
                    style={{marginRight: 25, top: 8}}
                  />
                )}
                onPress={() => {
                  this.props.navigation.navigate('MyCart');
                }}
              />
              <List.Item
                titleStyle={{fontSize: 20}}
                title="Add Address"
                onPress={() => {
                  this.props.navigation.navigate('Add Address');
                }}
                left={() => (
                  <EnIcon
                    name="location-pin"
                    size={22}
                    style={{marginRight: 25, top: 9}}
                  />
                )}
              />

              <List.Item
                titleStyle={{fontSize: 20}}
                title="My Account"
                left={() => (
                  <MaterialIcon
                    name="dashboard"
                    size={22}
                    style={{marginRight: 25, top: 9}}
                  />
                )}
                onPress={() => {
                  this.props.navigation.navigate('My Account');
                }}
              />
              <List.Item
                titleStyle={{fontSize: 20}}
                title="My Orders"
                left={() => (
                  <EnIcon
                    name="shopping-cart"
                    size={22}
                    style={{marginRight: 25, top: 9}}
                  />
                )}
                onPress={() => {
                  this.props.navigation.navigate('My Orders');
                }}
              />
            </View>
          ) : null}

          <List.Accordion
            titleStyle={{fontSize: 20, marginLeft: 25, color: 'black'}}
            title="Products"
            left={() => <FaIcon name="sitemap" size={22} />}>
            <List.Item
              titleStyle={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft: 25,
              }}
              title="Bed"
              left={() => (
                <FaIcon name="bed" size={22} style={{marginLeft: 50, top: 5}} />
              )}
              onPress={() => {
                this.props.navigation.navigate('Bed', {
                  id: '5cfe3c65ea821930af69281f',
                });
              }}
            />
            <List.Item
              titleStyle={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft: 25,
              }}
              onPress={() => {
                this.props.navigation.navigate('Sofa', {
                  id: '5cfe3c5aea821930af69281e',
                });
              }}
              title="Sofa"
              left={() => (
                <FaIcon
                  name="couch"
                  size={22}
                  style={{marginLeft: 50, top: 5}}
                />
              )}
            />
            <List.Item
              titleStyle={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft: 25,
              }}
              title="Table"
              left={() => (
                <FaIcon
                  name="table"
                  size={22}
                  style={{marginLeft: 50, top: 5}}
                />
              )}
              onPress={() => {
                this.props.navigation.navigate('Table', {
                  id: '5cfe3c79ea821930af692821',
                });
              }}
            />
            <List.Item
              titleStyle={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft: 25,
              }}
              title="Chair"
              left={() => (
                <FaIcon
                  name="chair"
                  size={22}
                  style={{marginLeft: 50, top: 5}}
                />
              )}
              onPress={() => {
                this.props.navigation.navigate('Chair', {
                  id: '5cfe3c6fea821930af692820',
                });
              }}
            />
            <List.Item
              titleStyle={{
                fontSize: 16,
                fontWeight: '500',
                marginLeft: 25,
              }}
              title="Almirah"
              left={() => (
                <MaIcon
                  name="file-cabinet"
                  size={22}
                  style={{marginLeft: 50, top: 5}}
                />
              )}
              onPress={() => {
                this.props.navigation.navigate('Almirah', {
                  id: '5d14c15101ae103e6e94fbe0',
                });
              }}
            />
          </List.Accordion>

          <List.Item
            titleStyle={{fontSize: 22}}
            title="Store locator"
            onPress={() => {
              this.props.navigation.navigate('Store Locator');
            }}
            left={() => (
              <EnIcon
                name="location-pin"
                size={22}
                style={{marginRight: 25, top: 9}}
              />
            )}
          />
          {this.state.isloggedIn === true ? (
            <TouchableOpacity
              style={{marginVertical: 10}}
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

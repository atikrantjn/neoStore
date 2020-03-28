import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../utils/images';
import EnIcon from 'react-native-vector-icons/Entypo';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import {List} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      isloggedIn: false,
      token: '',
      data: {},
    };
  }

  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userData');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  logoutHandler = () => {
    const title = 'Time to choose!';
    const message = 'are u sure u wanna logout';
    const buttons = [
      {text: 'Cancel', type: 'cancel'},
      {
        text: 'yes',
        onPress: () => {
          this.removeValue();
          this.setState({isloggedIn: false});
          this.props.navigation.navigate('Home');
        },
      },
    ];
    Alert.alert(title, message, buttons);
  };

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded,
    });

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({isloggedIn: true, data: value});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  componentDidMount() {
    console.log('in component sidebar', this.state.data);

    this.getData();
    setInterval(this.getData, 5000);
  }

  render(props) {
    return (
      <View style={styles.sideMenuContainer}>
        <Image
          source={images.sideDrawerImage}
          style={styles.sideMenuProfileIcon}
        />

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
          }}
        />

        <DrawerContentScrollView {...props}>
          {!this.state.isloggedIn === true ? (
            <List.Accordion
              titleStyle={{fontSize: 22, marginLeft: 25, color: 'black'}}
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
                titleStyle={{fontSize: 22}}
                title="My Cart"
                left={() => (
                  <EnIcon
                    name="shopping-cart"
                    size={22}
                    style={{marginRight: 25}}
                  />
                )}
                onPress={() => {
                  this.props.navigation.navigate('MyCart');
                }}
              />
              <List.Item
                titleStyle={{fontSize: 22}}
                title="Add Address"
                onPress={() => {
                  this.props.navigation.navigate('Add Address');
                }}
                left={() => (
                  <EnIcon
                    name="location-pin"
                    size={22}
                    style={{marginRight: 25}}
                  />
                )}
              />

              <List.Item
                titleStyle={{fontSize: 22}}
                title="MyAccount"
                left={() => (
                  <MaterialIcon
                    name="dashboard"
                    size={22}
                    style={{marginRight: 25}}
                  />
                )}
                onPress={() => {
                  this.props.navigation.navigate('My Account');
                }}
              />
            </View>
          ) : null}

          <List.Item
            titleStyle={{fontSize: 22}}
            title="Dashboard"
            left={() => (
              <MaterialIcon
                name="dashboard"
                size={22}
                style={{marginRight: 25}}
              />
            )}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          />
          <List.Accordion
            titleStyle={{fontSize: 22, marginLeft: 25, color: 'black'}}
            title="Products"
            left={() => <FaIcon name="sitemap" size={22} />}>
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Bed"
              left={() => (
                <FaIcon name="bed" size={22} style={{marginRight: 25}} />
              )}
              onPress={() => {
                this.props.navigation.navigate('Bed', {
                  id: '5cfe3c65ea821930af69281f',
                });
              }}
            />
            <List.Item
              titleStyle={{fontSize: 22}}
              onPress={() => {
                this.props.navigation.navigate('Sofa', {
                  id: '5cfe3c5aea821930af69281e',
                });
              }}
              title="Sofa"
              left={() => (
                <FaIcon name="couch" size={22} style={{marginRight: 25}} />
              )}
            />
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Table"
              left={() => (
                <FaIcon name="table" size={22} style={{marginRight: 25}} />
              )}
              onPress={() => {
                this.props.navigation.navigate('Table', {
                  id: '5cfe3c79ea821930af692821',
                });
              }}
            />
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Chair"
              left={() => (
                <FaIcon name="chair" size={22} style={{marginRight: 25}} />
              )}
              onPress={() => {
                this.props.navigation.navigate('Chair', {
                  id: '5cfe3c6fea821930af692820',
                });
              }}
            />
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Almirah"
              left={() => (
                <FaIcon name="chair" size={22} style={{marginRight: 25}} />
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
              <EnIcon name="location-pin" size={22} style={{marginRight: 25}} />
            )}
          />
          {this.state.isloggedIn === true ? (
            <View>
              <TouchableOpacity
                style={styles.customBtnBG}
                onPress={() => {
                  this.logoutHandler();
                }}>
                <Text style={styles.customBtnText}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </DrawerContentScrollView>
      </View>
    );
  }
}

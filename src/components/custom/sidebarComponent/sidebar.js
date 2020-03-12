import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../utils/images';
import EnIcon from 'react-native-vector-icons/Entypo';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import {List} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
    };
  }
  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded,
    });
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
          <List.Section>
            <List.Accordion
              titleStyle={{fontSize: 22, marginLeft: 25, color: 'black'}}
              title="Account"
              left={() => <EnIcon name="users" size={22} />}>
              <View style={{justifyContent: 'center'}}>
                <List.Item
                  titleStyle={{fontSize: 18, fontWeight: '500', marginLeft: 25}}
                  title="Login"
                  left={() => <FaIcon name="user" size={20} />}
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}
                />
                <List.Item
                  titleStyle={{fontSize: 18, fontWeight: '500', marginLeft: 25}}
                  title="Register"
                  left={() => <AntDesign name="adduser" size={20} />}
                  onPress={() => {
                    this.props.navigation.navigate('Register');
                  }}
                />
              </View>
            </List.Accordion>
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
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Bed"
              left={() => (
                <FaIcon name="bed" size={22} style={{marginRight: 25}} />
              )}
              onPress={() => {
                this.props.navigation.navigate('Bed');
              }}
            />
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Sofa"
              left={() => (
                <FaIcon name="couch" size={22} style={{marginRight: 25}} />
              )}
            />
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Table"
              left={() => (
                <FaIcon name="couch" size={22} style={{marginRight: 25}} />
              )}
            />
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Chair"
              left={() => (
                <FaIcon name="chair" size={22} style={{marginRight: 25}} />
              )}
            />
            <List.Item
              titleStyle={{fontSize: 22}}
              title="Store locator"
              left={() => (
                <EnIcon
                  name="location-pin"
                  size={22}
                  style={{marginRight: 25}}
                />
              )}
            />
          </List.Section>
        </DrawerContentScrollView>
      </View>
    );
  }
}

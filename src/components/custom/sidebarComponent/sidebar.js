import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import images from '../../../utils/images';
import EnIcon from 'react-native-vector-icons/Entypo';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {DrawerItem} from '@react-navigation/drawer';

export default class Sidebar extends Component {
  constructor() {
    super();
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
          <DrawerItem
            icon={() => <FaIcon name="user" size={25} />}
            label={() => <Text style={{fontSize: 20}}>Account</Text>}
          />
          <DrawerItem
            icon={() => <FaIcon name="bed" size={25} />}
            label={() => <Text style={{fontSize: 20}}>Bed</Text>}
            // onPress={() => this.props.navigation.navigate('Mycart')}
          />
          <DrawerItem
            icon={() => <FaIcon name="couch" size={25} />}
            label={() => <Text style={{fontSize: 20}}>Sofa</Text>}
          />
          <DrawerItem
            icon={() => <Icon name="camera" />}
            label={() => <Text style={{fontSize: 20}}>Table</Text>}
          />
          <DrawerItem
            icon={() => <FaIcon name="chair" size={25} />}
            label={() => <Text style={{fontSize: 20}}>Chair</Text>}
          />
          <DrawerItem
            icon={() => <EnIcon name="location-pin" size={25} />}
            label={() => <Text style={{fontSize: 20}}>Store Locator</Text>}
          />
        </DrawerContentScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  sideMenuProfileIcon: {
    height: 250,
    width: 280,
  },
});

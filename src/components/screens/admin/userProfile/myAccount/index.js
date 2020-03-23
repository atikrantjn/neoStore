import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import images from '../../../../../utils/images';
export class MyAccount extends Component {
  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Image
              source={images.sideDrawerImage}
              style={{height: 150, width: 150, borderRadius: 100}}
            />
          </View>

          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              value="read only name"
              underlineColorAndroid="transparent"
              editable={false}></TextInput>
          </View>

          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              value="read only surname"
              underlineColorAndroid="transparent"
              editable={false}></TextInput>
          </View>

          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              value="read only email"
              underlineColorAndroid="transparent"
              editable={false}></TextInput>
          </View>

          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              value="read only phone"
              underlineColorAndroid="transparent"
              editable={false}></TextInput>
          </View>
          <View style={styles.registerInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.props.navigation.navigate('Edit Profile');
              }}>
              <Text style={styles.customBtnText}>EDIT PROFILE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.props.navigation.navigate('Reset Password');
              }}>
              <Text style={styles.customBtnText}>RESET PASSWORD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default MyAccount;

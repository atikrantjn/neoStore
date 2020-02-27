import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>
        <View>
          <View style={styles.loginInput}>
            <Icon name="user" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"></TextInput>
          </View>
          <View style={styles.loginInput}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.loginInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                Alert.alert('button pressed');
              }}>
              <Text style={styles.customBtnText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPassword}>
            <Text
              style={styles.forgotText}
              // onPress={() => Linking.openURL('http://google.com')}
            >
              Forgot Password ?
            </Text>
          </View>
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>DON'T HAVE AN ACCOUNT ?</Text>
          <View style={styles.plusSign}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('image pressed');
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../../../assets/images/plus-sign.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

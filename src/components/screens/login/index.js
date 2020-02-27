import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import images from '../../../utils/images';
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
              // onPress={() => this.props.navigation.navigate('Register')}
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
                this.props.navigation.navigate('Register');
              }}>
              <Image style={{width: 30, height: 30}} source={images.plusSign} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

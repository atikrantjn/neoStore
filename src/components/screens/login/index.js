import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import images from '../../../utils/images';
import styles from './styles';
import axios from 'axios';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

      isLoading: false,
    };
  }

  validateUser = () => {
    const userInput = {
      email: this.state.email,
      pass: this.state.password,
    };

    if (userInput.email === '' || userInput.pass === '') {
      alert('fields cannot be empty');
    } else {
      this.setState({isLoading: true});
      axios
        .post('http://180.149.241.208:3022/login', userInput)
        .then(res => {
          if (res.status === 200) {
            this.setState({isLoading: false});
            alert('login successful');
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };

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
              onChangeText={email => {
                this.setState({email: email});
              }}
              underlineColorAndroid="transparent"></TextInput>
          </View>

          {this.state.isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null}

          <View style={styles.loginInput}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry
              onChangeText={password => {
                this.setState({password: password});
              }}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.loginInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.validateUser();
              }}>
              <Text style={styles.customBtnText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPassword}>
            <Text
              style={styles.forgotText}
              onPress={() => this.props.navigation.navigate('Forgot Password')}>
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

import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import images from '../../../utils/images';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import axios from 'axios';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

      emailErrr: false,
      passErr: false,

      isLoading: false,
      showAlert: false,
    };
  }

  validateUser = () => {
    const userInput = {
      email: this.state.email,
      pass: this.state.password,
    };

    if (userInput.email === '' || userInput.pass === '') {
      this.setState({emailErrr: true, passErr: true});
    } else {
      this.setState({isLoading: true});
      axios
        .post('http://180.149.241.208:3022/login', userInput)
        .then(res => {
          if (res.status === 200) {
            this.setState({isLoading: false});
            this.showAlert();
            setTimeout(() => {
              this.props.navigation.navigate('Admin');
              this.hideAlert();
            }, 3000);
          }
        })
        .catch(err => {
          this.setState({isLoading: false, emailErrr: false, passErr: false});

          alert('wrong credentials');
        });
    }
  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    const {showAlert} = this.state;
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
                this.setState({email: email, emailErrr: false});
              }}
              underlineColorAndroid="transparent"></TextInput>
            {this.state.emailErrr ? (
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                * this field cannot be kept empty
              </Text>
            ) : null}
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
                this.setState({password: password, passErr: false});
              }}
              underlineColorAndroid="transparent"
            />
            {this.state.passErr ? (
              <Text style={{color: 'white'}}>
                * this field cannot be kept empty
              </Text>
            ) : null}
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
        <AwesomeAlert
          show={showAlert}
          title="Yeahh"
          message="login successful,redirecting...."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          messageStyle={{color: 'green', fontSize: 18}}
          contentContainerStyle={{width: 350, height: 120}}
        />
      </View>
    );
  }
}

export default Login;

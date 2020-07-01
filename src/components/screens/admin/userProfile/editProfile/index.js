import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import images from '../../../../../utils/images';
import DatePicker from 'react-native-datepicker';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_URL} from '../../../../../config/api';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Loader from '../../../../custom/loaderComponent/loader';

export class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      dob: '',
      phone_no: '',
      gender: '',

      token: '',
      showAlert: false,
      firstNameErr: false,

      lastNameErr: false,
      emailErr: false,

      phoneErr: false,
      profile_img: null,
      customerData: {},
      img: null,
      isLoading: false,
    };
  }

  getToken = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('userData'));

      if (value !== null) {
        this.setState({token: value.token});
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  validatePhone = phone_no => {
    let phoneValid = /^[0-9]*(?:\d{1,2})?$/;

    if (phoneValid.test(phone_no) === false) {
      this.setState({phoneErr: true});
      return false;
    } else {
      this.setState({phone_no: phone_no, phoneErr: false});
    }
  };

  // validateEmail = email => {
  //   let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]$)$/;

  //   if (pattern.test(email) === false) {
  //     this.setState({emailErr: true});
  //     return false;
  //   } else {
  //     this.setState({email: email, emailErr: false});
  //   }
  // };

  updateProfile = () => {
    const {token, profile_img} = this.state;

    this.setState({isLoading: true});

    RNFetchBlob.fetch(
      'PUT',
      'http://180.149.241.208:3022/profile',
      {
        Authorization: 'Bearer ' + token,

        'Content-Type': 'multipart/form-data',
      },

      [
        {
          name: 'profile_img',
          filename: profile_img.fileName,
          type: profile_img.type,
          data: RNFetchBlob.wrap(profile_img.path),
        },
        {name: 'first_name', data: this.state.first_name},
        {name: 'last_name', data: this.state.last_name},
        {name: 'email', data: this.state.email},
        {name: 'dob', data: this.state.dob},
        {name: 'phone_no', data: this.state.phone_no},
        {name: 'gender', data: this.state.gender},
      ],
    )
      .then(resp => {
        // ...
        const data = JSON.parse(resp.data);

        if (data.success === true) {
          Alert.alert(data.message);

          AsyncStorage.getItem('userData')
            .then(d => {
              let iData = JSON.parse(d);

              iData.customer_details.profile_img =
                data.customer_details.profile_img;

              iData.customer_details.first_name =
                data.customer_details.first_name;

              iData.customer_details.last_name =
                data.customer_details.last_name;

              console.log(iData);

              AsyncStorage.setItem('userData', JSON.stringify(iData));
            })
            .done();

          this.setState({
            img: data.customer_details.profile_img,
            isLoading: false,
          });
          this.props.navigation.navigate('My Account', {
            d: 'abc',
          });
        }
      })
      .catch(err => {
        // ...
        Alert.alert('oopsssss something went wrong');
      });
  };

  componentDidMount = async () => {
    await this.getToken();
    const {customerData} = this.props.route.params;
    this.setState({
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email: customerData.email,
      phone_no: customerData.phone_no,
      gender: customerData.gender,
      img: customerData.profile_img,
    });
  };

  chooseFile = () => {
    var options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('no image selected');
      } else {
        this.setState({profile_img: response});

        Alert.alert('image picked');
      }
    });
  };

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
            <TouchableOpacity
              onPress={() => {
                this.chooseFile();
              }}>
              {this.state.img === null ? (
                <Image
                  source={images.userIcon}
                  style={{height: 150, width: 150, borderRadius: 100}}
                />
              ) : (
                <Image
                  source={{
                    uri: BASE_URL + this.state.img,
                  }}
                  style={{height: 150, width: 150, borderRadius: 100}}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.registerInput}>
            <FaIcon
              name="user"
              size={25}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              value={this.state.first_name}
              onChangeText={first_name => {
                this.setState({first_name: first_name});
              }}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.registerInput}>
            <FaIcon
              name="user"
              size={25}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              value={this.state.last_name}
              underlineColorAndroid="transparent"
              onChangeText={last_name => {
                this.setState({last_name: last_name});
              }}
            />
          </View>
          {this.state.isLoading ? <Loader /> : null}

          <View style={styles.registerInput}>
            <MatIcon
              name="email"
              size={25}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              value={this.state.email}
              placeholder="email"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({email})}
            />
            {this.state.emailErr ? (
              <Text style={{color: 'white'}}>invalid email address</Text>
            ) : null}
          </View>

          <View style={styles.registerInput}>
            <FaIcon
              name="phone"
              size={25}
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                color: 'white',
              }}
            />
            <TextInput
              style={styles.input}
              value={this.state.phone_no}
              placeholder="phone no."
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              maxLength={10}
              onChangeText={phone_no => this.validatePhone(phone_no)}
            />
            {this.state.phoneErr ? (
              <Text style={{color: 'white'}}>
                should not contain alphabets and characters and special
                characters
              </Text>
            ) : null}
          </View>

          <View style={styles.registerInput}>
            <DatePicker
              date={this.state.dob}
              style={{
                width: '100%',
                color: 'white',
                borderColor: 'white',
                borderWidth: 1.5,
              }}
              mode="date"
              maxDate={new Date()}
              placeholder="select date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 5,
                  top: 4,
                },
                dateText: {
                  color: 'white',
                  fontSize: 20,
                },
              }}
              onDateChange={date => {
                this.setState({dob: date});
              }}
            />
          </View>
          <View style={styles.registerInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.updateProfile();
              }}>
              <Text style={styles.customBtnText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EditProfile;

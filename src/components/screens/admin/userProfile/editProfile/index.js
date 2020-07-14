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
import {BASE_URL, API_URL} from '../../../../../config/api';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Loader from '../../../../custom/modalLoader/index';

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
      firstNameErr: '',

      lastNameErr: '',
      emailErr: '',

      phoneErr: '',
      dobErr: '',

      profile_img: null,

      img: null,
      isLoading: false,

      noImgSelected: false,

      customerData: {},
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

  validatePhone = () => {
    let phoneValid = /^[0-9]*(?:\d{1,2})?$/;

    if (this.state.phone_no === '') {
      this.setState({phoneErr: 'field cannot be kept empty'});
      return false;
    } else if (!phoneValid.test(this.state.phone_no)) {
      this.setState({phoneErr: 'should be digits only'});
      return false;
    } else {
      this.setState({phoneErr: ''});
      return true;
    }
  };

  validateEmail = () => {
    let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;
    if (this.state.email === '') {
      this.setState({emailErr: 'cannot be kept blank'});
      return false;
    } else if (!pattern.test(this.state.email)) {
      this.setState({emailErr: 'invalid email address'});
      return false;
    } else {
      this.setState({emailErr: ''});
      return true;
    }
  };

  validateName = () => {
    if (this.state.first_name === '') {
      this.setState({firstNameErr: 'cannot be kept blank'});
      return false;
    } else {
      this.setState({firstNameErr: ''});
      return true;
    }
  };

  validateLastName = () => {
    if (this.state.last_name === '') {
      this.setState({lastNameErr: 'cannot be kept blank'});
      return false;
    } else {
      this.setState({lastNameErr: ''});
      return true;
    }
  };

  validateDob = () => {
    if (this.state.dob === '') {
      this.setState({dobErr: 'Please select date of birth'});
      return false;
    } else {
      this.setState({dobErr: ''});
      return true;
    }
  };

  updateProfile = () => {
    const {token, profile_img, noImgSelected} = this.state;

    let fname = this.validateName();
    let lname = this.validateLastName();
    let email = this.validateEmail();
    let phone = this.validatePhone();
    let dob = this.validateDob();

    if (fname && lname && email && phone && dob) {
      this.setState({isLoading: true});
      RNFetchBlob.fetch(
        'PUT',
        BASE_URL + API_URL.EDIT_USER_PROFILE_API,
        {
          Authorization: 'Bearer ' + token,

          'Content-Type': 'multipart/form-data',
        },

        [
          noImgSelected
            ? {
                name: 'profile_img',
                data: null,
                fileName: null,
                type: null,
              }
            : {
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
            AsyncStorage.getItem('userData')
              .then(d => {
                let iData = JSON.parse(d);

                iData.customer_details.profile_img =
                  data.customer_details.profile_img;

                iData.customer_details.first_name =
                  data.customer_details.first_name;

                iData.customer_details.last_name =
                  data.customer_details.last_name;

                AsyncStorage.setItem('userData', JSON.stringify(iData));
              })
              .done();

            this.setState({
              img: data.customer_details.profile_img,
              isLoading: false,
            });

            Alert.alert(
              'Success',
              data.message,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    this.props.navigation.navigate('My Account', {
                      d: 'abc',
                    });
                  },
                },
              ],
              {cancelable: false},
            );
          }
        })
        .catch(err => {
          this.setState({isLoading: false});
          // ...
          Alert.alert('Error', 'Oopsssss something went wrong');
        });
    }
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
      if (response.didCancel) {
        this.setState({noImgSelected: true});
      } else {
        this.setState({profile_img: response});
      }
    });
  };

  render() {
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => {
                this.chooseFile();
              }}>
              {this.state.img === null ? (
                <Image source={images.userIcon} style={styles.imageStyle} />
              ) : (
                <Image
                  source={{
                    uri: BASE_URL + this.state.img,
                  }}
                  style={styles.imageStyle}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.registerInput}>
            <FaIcon name="user" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              value={this.state.first_name}
              onChangeText={first_name => {
                this.setState({first_name}, () => {
                  this.validateName();
                });
              }}
              underlineColorAndroid="transparent"
            />

            {this.state.firstNameErr ? (
              <Text style={styles.errorText}>{this.state.firstNameErr}</Text>
            ) : null}
          </View>

          <View style={styles.registerInput}>
            <FaIcon name="user" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              value={this.state.last_name}
              underlineColorAndroid="transparent"
              onChangeText={last_name => {
                this.setState({last_name}, () => {
                  this.validateLastName();
                });
              }}
            />
            {this.state.lastNameErr ? (
              <Text style={styles.errorText}>{this.state.lastNameErr}</Text>
            ) : null}
          </View>
          {this.state.isLoading ? (
            <Loader isLoading={this.state.isLoading} />
          ) : null}

          <View style={styles.registerInput}>
            <MatIcon name="email" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              value={this.state.email}
              placeholder="email"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={email => {
                this.setState({email}, () => {
                  this.validateEmail();
                });
              }}
            />
            {this.state.emailErr ? (
              <Text style={styles.errorText}>{this.state.emailErr}</Text>
            ) : null}
          </View>

          <View style={styles.registerInput}>
            <FaIcon name="phone" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              value={this.state.phone_no}
              placeholder="phone no."
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              maxLength={10}
              onChangeText={phone_no => {
                this.setState({phone_no}, () => {
                  this.validatePhone();
                });
              }}
            />
            {this.state.phoneErr ? (
              <Text style={styles.errorText}>{this.state.phoneErr}</Text>
            ) : null}
          </View>

          <View style={styles.registerInput}>
            <DatePicker
              date={this.state.dob}
              style={styles.datePickerStyle}
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
              onDateChange={dob => {
                this.setState({dob}, () => {
                  this.validateDob();
                });
              }}
            />
            {this.state.dobErr ? (
              <Text style={styles.errorText}>{this.state.dobErr}</Text>
            ) : null}
          </View>

          <View style={styles.footerBtnContainer}>
            <TouchableOpacity
              onPress={() => {
                this.updateProfile();
              }}>
              <View style={styles.saveProfileBtn}>
                <Text style={styles.saveProfileBtnText}>SAVE PROFILE</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EditProfile;

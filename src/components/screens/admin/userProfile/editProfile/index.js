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
      firstNameErr: '',

      lastNameErr: '',
      emailErr: '',

      phoneErr: '',
      dobErr: '',

      profile_img: null,

      img: null,
      isLoading: false,

      noImgSelected: false,
      emptyImage: true,
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
    const {token, profile_img, noImgSelected, emptyImage} = this.state;

    let fname = this.validateName();
    let lname = this.validateLastName();
    let email = this.validateEmail();
    let phone = this.validatePhone();
    let dob = this.validateDob();

    if (fname && lname && email && phone && dob) {
      RNFetchBlob.fetch(
        'PUT',
        BASE_URL + API_URL.EDIT_USER_PROFILE_API,
        {
          Authorization: 'Bearer ' + token,

          'Content-Type': 'multipart/form-data',
        },

        [
          noImgSelected || emptyImage
            ? {
                name: 'profile_img',
                data: RNFetchBlob.wrap(null),
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

            this.setState({
              img: data.customer_details.profile_img,
            });
          }
        })
        .catch(err => {
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
      console.log('Response = ', response);

      if (response.didCancel) {
        this.setState({noImgSelected: true, emptyImage: false});
      } else {
        this.setState({profile_img: response});
      }
    });
  };

  render() {
    console.log(this.state.dob);
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 15,
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
                this.setState({first_name}, () => {
                  this.validateName();
                });
              }}
              underlineColorAndroid="transparent"
            />

            {this.state.firstNameErr ? (
              <Text style={{color: 'white'}}>{this.state.firstNameErr}</Text>
            ) : null}
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
                this.setState({last_name}, () => {
                  this.validateLastName();
                });
              }}
            />
            {this.state.lastNameErr ? (
              <Text style={{color: 'white'}}>{this.state.lastNameErr}</Text>
            ) : null}
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
              onChangeText={email => {
                this.setState({email}, () => {
                  this.validateEmail();
                });
              }}
            />
            {this.state.emailErr ? (
              <Text style={{color: 'white'}}>{this.state.emailErr}</Text>
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
              onChangeText={phone_no => {
                this.setState({phone_no}, () => {
                  this.validatePhone();
                });
              }}
            />
            {this.state.phoneErr ? (
              <Text style={{color: 'white'}}>{this.state.phoneErr}</Text>
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
              onDateChange={dob => {
                this.setState({dob}, () => {
                  this.validateDob();
                });
              }}
            />
            {this.state.dobErr ? (
              <Text style={{color: 'white'}}>{this.state.dobErr}</Text>
            ) : null}
          </View>
          <View style={{marginHorizontal: 50, marginBottom: 10}}>
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

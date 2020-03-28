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
import DatePicker from 'react-native-datepicker';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      dob: '',
      phone_no: '',

      showAlert: false,

      firstNameErr: false,

      lastNameErr: false,
      emailErr: false,

      phoneErr: false,

      customerData: {},
    };
  }

  validatePhone = phone_no => {
    let phoneValid = /^[0-9]*(?:\d{1,2})?$/;

    if (phoneValid.test(phone_no) === false) {
      this.setState({phoneErr: true});
      return false;
    } else {
      this.setState({phone_no: phone_no, phoneErr: false});
    }
  };

  validateEmail = email => {
    let pattern = /^([a-zA-Z])+([0-9a-zA-Z_\.\-])+\@+(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5}$)$/;

    if (pattern.test(email) === false) {
      this.setState({emailErr: true});
      return false;
    } else {
      this.setState({email: email, emailErr: false});
    }
  };

  componentDidMount = () => {
    const {customerData} = this.props.route.params;
    this.setState({customerData: customerData});
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
            <Image
              source={images.sideDrawerImage}
              style={{height: 150, width: 150, borderRadius: 100}}
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
              value={this.state.customerData.first_name}
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
              value={this.state.customerData.last_name}
              underlineColorAndroid="transparent"
            />
          </View>

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
              value={this.state.customerData.email}
              placeholder="email"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={email => this.validateEmail(email)}
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
              value={this.state.customerData.phone_no}
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
              date={this.state.customerData.dob}
              style={{width: '100%', borderColor: 'white', borderWidth: 1.5}}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 10,
                  top: 4,
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
                alert('hello');
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

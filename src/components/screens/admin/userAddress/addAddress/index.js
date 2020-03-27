import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';

class AddAddress extends Component {
  constructor(props) {
    super(props);

    this.myTextInput = React.createRef();

    this.state = {
      address: '',
      landmark: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',

      zipCodeErr: false,
      allFieldsRequired: false,
    };
  }

  validatezipCode = zipCode => {
    if (zipCode.length < 6) {
      this.setState({zipCodeErr: true});
      return false;
    }
    this.setState({zipCode: zipCode});
  };

  saveAddress = () => {
    const {address, landmark, city, state, zipCode, country} = this.state;

    if (
      address === '' ||
      landmark === '' ||
      city === '' ||
      state === '' ||
      zipCode === '' ||
      country === ''
    ) {
      Alert.alert('fields cannot be kept empty');
    }
    Alert.alert('submitted');
  };

  render() {
    const state = {...this.state};
    console.log(state);
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>Address</Text>
              <TextInput
                ref={this.myTextInput}
                numberOfLines={4}
                multiline
                textAlignVertical={'top'}
                style={styles.addressTextInput}
                onChangeText={address => {
                  this.setState({address: address});
                }}
              />
            </View>

            <View style={styles.landmarkContainer}>
              <Text style={styles.landmarkText}>Landmark</Text>
              <TextInput
                ref={this.myTextInput}
                style={styles.landmarkTextInput}
                onChangeText={landmark => {
                  this.setState({landmark: landmark});
                }}
              />
            </View>

            <View style={styles.cityStateContainer}>
              <View style={styles.cityTextContainer}>
                <Text style={styles.cityText}>City</Text>
                <TextInput
                  ref={this.myTextInput}
                  style={styles.cityTextInput}
                  onChangeText={city => {
                    this.setState({city: city});
                  }}
                />
              </View>

              <View style={styles.stateTextContainer}>
                <Text style={styles.stateText}>State</Text>
                <TextInput
                  ref={this.myTextInput}
                  style={styles.stateTextInput}
                  onChangeText={state => {
                    this.setState({state: state});
                  }}
                />
              </View>
            </View>

            <View style={styles.zipCountryContainer}>
              <View style={styles.zipContainer}>
                <Text style={styles.zipText}>Zip Code</Text>
                <TextInput
                  ref={this.myTextInput}
                  keyboardType={'number-pad'}
                  maxLength={6}
                  style={styles.zipTextInput}
                  onChangeText={zipCode => {
                    this.validatezipCode(zipCode);
                  }}
                />
                {this.state.zipCodeErr ? (
                  <Text style={{fontSize: 15, color: 'red', marginLeft: 15}}>
                    * should be 6 digits only
                  </Text>
                ) : null}
              </View>

              <View style={styles.countryContainer}>
                <Text style={styles.countryText}>Country</Text>
                <TextInput
                  style={styles.countryTextInput}
                  onChangeText={country => {
                    this.setState({country: country});
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.saveAddressBtnBg}
            onPress={() => {
              this.saveAddress();
            }}>
            <Text style={styles.saveAddressBtnText}>SAVE ADDRESS</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.saveAddressBtnBg}
            onPress={() => {
              this.props.navigation.navigate('Address List');
            }}>
            <Text style={styles.saveAddressBtnText}> ADDRESS List </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AddAddress;

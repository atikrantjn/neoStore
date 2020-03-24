import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

class AddAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      landmark: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    };
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>Address</Text>
              <TextInput
                numberOfLines={4}
                multiline
                textAlignVertical={'top'}
                style={styles.addressTextInput}
              />
            </View>

            <View style={styles.landmarkContainer}>
              <Text style={styles.landmarkText}>Landmark</Text>
              <TextInput style={styles.landmarkTextInput} />
            </View>

            <View style={styles.cityStateContainer}>
              <View style={styles.cityTextContainer}>
                <Text style={styles.cityText}>City</Text>
                <TextInput style={styles.cityTextInput} />
              </View>

              <View style={styles.stateTextContainer}>
                <Text style={styles.stateText}>State</Text>
                <TextInput style={styles.stateTextInput} />
              </View>
            </View>

            <View style={styles.zipCountryContainer}>
              <View style={styles.zipContainer}>
                <Text style={styles.zipText}>Zip Code</Text>
                <TextInput
                  keyboardType={'number-pad'}
                  style={styles.zipTextInput}
                />
              </View>

              <View style={styles.countryContainer}>
                <Text style={styles.countryText}>Country</Text>
                <TextInput style={styles.countryTextInput} />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.saveBtnContainer}>
          <TouchableOpacity style={styles.saveAddressBtnBg}>
            <Text style={styles.saveAddressBtnText}>SAVE ADDRESS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AddAddress;

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

export class EditProfile extends Component {
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
            <TextInput
              style={styles.input}
              value="read only name"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              value="read only surname"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              value="read only email"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.registerInput}>
            <TextInput
              style={styles.input}
              value="read only phone"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.registerInput}>
            <DatePicker
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

import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
import {InputGroup, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
const screenWidth = Math.round(Dimensions.get('window').width);
export class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.neostoreHeader}>NeoSTORE</Text>
        </View>
        <View style={{marginLeft: 50}}>
          <View>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>
          <View style={styles.forgotInput}>
            {/* <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="white"
              inlineImageLeft="username"
              underlineColorAndroid="transparent"></TextInput> */}

            <InputGroup
              style={{
                marginVertical: 45,
                borderBottomWidth: 1,
                borderColor: 'white',
                width: screenWidth - 100,
              }}>
              <Icon
                name={'user'}
                size={27}
                color={'white'}
                style={{marginRight: 40}}
              />
              <Input
                placeholder="username"
                placeholderTextColor="white"
                style={styles.input}
              />
            </InputGroup>
          </View>
          <View style={styles.loginInput}>
            <TouchableOpacity
              style={styles.customBtnBG}
              onPress={() => {
                this.props.navigation.navigate('Admin');
              }}>
              <Text style={styles.customBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default index;

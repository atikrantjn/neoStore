import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
const Welcome = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.neostoreHeading}>NeoSTORE</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

export default Welcome;

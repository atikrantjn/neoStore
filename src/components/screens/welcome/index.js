import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './styles';

class welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {token: ''};
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.navigation.replace('Admin');
    }, 2000);
  }
  render() {
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
  }
}

export default welcome;

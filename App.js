import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Login from './src/components/screens/login/index';
import Welcome from './src/components/screens/welcome/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        loading: false,
      });
      this.setState({component: <Login />});
    }, 5000);
  }

  // componentWillUnmount() {
  //   clearTimeout(this.timeout);
  // }

  render() {
    const {loading} = this.state;
    if (loading) return <Welcome />;
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

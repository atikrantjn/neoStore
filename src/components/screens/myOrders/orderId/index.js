import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';

export class OrderId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderData: [],
    };
  }

  componentDidMount = () => {
    const {orderData} = this.props.route.params;
    this.setState({orderData});
  };
  render() {
    this.state.orderData.map(el => {});
    return (
      <View>
        <FlatList
          data={this.state.orderData}
          renderItem={({item}) => {
            console.log(item, 'i');
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default OrderId;

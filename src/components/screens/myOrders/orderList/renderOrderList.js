import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';
const {width} = Dimensions.get('window');

class RenderOrderList extends Component {
  render() {
    const data = this.props;
    return (
      <View style={{width: width}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Order Id', {
              orderData: data.product_details,
              order_id: data.product_details[0].order_id,
            });
          }}>
          <View style={styles.renderContainer}>
            <View style={styles.renderOrderText}>
              <Text style={styles.renderIdText}>Id : {data._id}</Text>
            </View>

            <View style={styles.renderCostContainer}>
              <Text style={styles.renderTotalCost}>{`Rs. ${
                data.totalCost
              }`}</Text>
            </View>

            <View style={styles.renderOrderDateContainer}>
              <Text style={styles.renderOrderDateText}>
                {`Order Date :  ${data.orderDate}`}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RenderOrderList;

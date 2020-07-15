import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import styles from './styles';

import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const RenderOrderList = props => {
  const data = props;
  const navigation = useNavigation();
  return (
    <View style={{width: width}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Order Id', {
            orderData: data.product_details,
            order_id: data.order_id,
          });
        }}>
        <View style={styles.renderContainer}>
          <View style={styles.renderOrderText}>
            <Text style={styles.renderIdText}>Id : {data.id}</Text>
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
};

export default RenderOrderList;

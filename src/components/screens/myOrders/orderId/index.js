import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './styles';

import RenderOrderId from './renderOrderId';

export class OrderId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderData: [],
    };
  }

  // function to get data from params from navigation

  getDataFromParams = () => {
    const {orderData} = this.props.route.params;
    console.log(this.props.route.params.order_id);
    this.setState({orderData});
  };

  componentDidMount = async () => {
    await this.getDataFromParams();
  };

  FlatListItemSeparator = () => {
    return <View style={styles.itemSeperator} />;
  };

  componentDidUpdate = async prev => {
    let prev_id = prev.route.params.orderData[0].order_id;
    let new_id = this.props.route.params.orderData[0].order_id;
    let new_data = this.props.route.params.orderData;
    if (prev_id !== new_id) {
      this.setState({orderData: new_data});
    }
  };

  render() {
    let result = this.state.orderData.map(i => {
      return i.total_cartCost;
    });

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <FlatList
            data={this.state.orderData}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            ListFooterComponent={this.FlatListItemSeparator}
            renderItem={({item}) => {
              return (
                <RenderOrderId
                  {...this.props}
                  product_image={item.product_details[0].product_image}
                  product_name={item.product_details[0].product_name}
                  product_material={item.product_details[0].product_material}
                  quantity={item.quantity}
                  product_cost={item.product_details[0].product_cost}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.moduleSeperatorline} />
          <View style={styles.footerContainer}>
            <View style={styles.footerTotalContainer}>
              <Text style={styles.footerTotalText}>Total</Text>
            </View>
            <View style={styles.footerPriceContainer}>
              <Text style={styles.footerPriceText}>
                {'Rs.' + '' + result[0]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default OrderId;

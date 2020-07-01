import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {BASE_URL} from '../../../../config/api';

export class OrderId extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderData: [],
    };
  }

  getDataFromParams = () => {
    const {orderData} = this.props.route.params;
    console.log(this.props.route.params.order_id);
    this.setState({orderData});
  };

  componentDidMount = async () => {
    await this.getDataFromParams();

    // setInterval(this.getDataFromParams, 1000);
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
    console.log(this.state.orderData);
    let {width, height} = Dimensions.get('window');

    let result = this.state.orderData.map(i => {
      return i.total_cartCost;
    });

    return (
      <View style={{flex: 1}}>
        <View style={{width: width, height: height - 80}}>
          <FlatList
            data={this.state.orderData}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            ListFooterComponent={this.FlatListItemSeparator}
            renderItem={({item}) => {
              return (
                <View style={styles.container}>
                  <TouchableOpacity>
                    <View style={styles.listContainer}>
                      <Image
                        style={styles.imageStyle}
                        source={{
                          uri: BASE_URL + item.product_details[0].product_image,
                        }}
                      />

                      <View style={styles.productNameContainer}>
                        <Text style={styles.productName}>
                          {item.product_details[0].product_name}
                        </Text>
                        <Text style={styles.productMaterial}>
                          {item.product_details[0].product_material}
                        </Text>

                        <View style={styles.productCostContainer}>
                          <Text style={styles.productQty}>
                            {'Quantity :' + ' ' + item.quantity}
                          </Text>
                          <Text style={styles.productCost}>
                            {'Rs.' + ' ' + item.product_details[0].product_cost}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.moduleSeperatorline} />
          <View
            style={{
              width: width,
              height: 80,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 32}}>Total</Text>
            </View>
            <View style={{marginRight: 20}}>
              <Text style={{fontSize: 30}}>{'Rs.' + '' + result[0]}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default OrderId;

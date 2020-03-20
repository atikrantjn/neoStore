import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

export class OrderSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_data: {},
    };
  }
  componentDidMount() {
    const {sendProdData} = this.props.route.params;

    this.setState({product_data: sendProdData});
  }
  render() {
    const {product_data} = this.state;

    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            margin: 15,
          }}>
          <View>
            <Text style={{fontSize: 32}}>Naveen Patel</Text>
          </View>

          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 25}}>
              Address kjdhbfjkhkjsdfb kjsdhdfkjh skjdhfkjhsdfkj kjshdkjfh
            </Text>
          </View>
          <View style={{marginTop: 15}}>
            <TouchableOpacity
              style={{backgroundColor: 'red', borderRadius: 7, padding: 7}}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Change Or Add Address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 3,
            height: 10,
            borderColor: '#D5D5D5',
          }}></View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',

            margin: 25,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '50%'}}>
              <Text style={{fontSize: 30}}>
                {this.state.product_data.product_name}
              </Text>
            </View>
            <View>
              <Image
                style={{
                  width: 125,
                  height: 122,
                }}
                source={{
                  uri:
                    'http://180.149.241.208:3022/' + product_data.product_image,
                }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <View style={{width: '50%'}}>
              <Text style={{fontSize: 30}}>
                {product_data.product_material}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 30}}>
                {'Rs' + ' ' + product_data.product_cost}
              </Text>
            </View>
          </View>
          {/* <View>
            <Dropdown label="select" data={dropData} />
          </View> */}
        </View>

        <View
          style={{
            borderBottomWidth: 3,
            height: 10,
            borderColor: '#D5D5D5',
          }}></View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 25,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 28,
                textTransform: 'uppercase',
                textDecorationLine: 'underline',
              }}>
              Price Details
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 15,
            }}>
            <View style={{width: '50%'}}>
              <Text style={{fontSize: 25}}>Price</Text>
            </View>
            <View>
              <Text style={{fontSize: 25}}>
                {'Rs' + ' ' + product_data.product_cost}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <View>
              <Text style={{fontSize: 25}}>
                {'Rs' + ' ' + product_data.product_cost}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                style={{backgroundColor: 'red', borderRadius: 7, padding: 7}}
                onPress={() => {
                  alert('hello');
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  ORDER NOW
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default OrderSummary;

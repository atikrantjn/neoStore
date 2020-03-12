import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import styles from './styles';
import images from '../../../../utils/images';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    return fetch('http://180.149.241.208:3022/getAllCategories')
      .then(res => res.json())
      .then(response => {
        this.setState({
          dataSource: response.category_details,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const stateData = this.state.dataSource;
    let res = stateData.map(a => a.product_image);

    let url = 'http://180.149.241.208:3022/';
    const ele = res.map(el => {
      return url.concat(el);
    });

    console.log(name);
    const screenWidth = Dimensions.get('window').width;
    return (
      <ScrollView style={{width: screenWidth}}>
        <View style={styles.container}>
          <View>
            <SliderBox
              images={ele}
              sliderBoxHeight={300}
              autoplay
              circleLoop
              resizeMode={'cover'}
            />
          </View>

          <View style={{flex: 1, marginTop: 25}}>
            <FlatList
              data={this.state.dataSource}
              numColumns={2}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.productCategoryCard}
                      onPress={() => {
                        console.log(item.category_id);
                        this.props.navigation.navigate(item.category_name, {
                          id: item.category_id,
                        });

                        // this.props.navigation.navigate(item.category_id);
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 35,
                          textAlign: 'center',
                        }}>
                        {item.category_name}
                      </Text>
                      <Image
                        style={{width: 90, height: 90, marginLeft: 25}}
                        source={images.tableImage}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

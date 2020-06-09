import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  BackHandler,
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

  imageslider = index => {
    console.log(index, 'iiiii');

    switch (index) {
      case 0:
        this.props.navigation.navigate('Table', {
          id: '5cfe3c79ea821930af692821',
        });
        break;
      case 1:
        this.props.navigation.navigate('Bed', {
          id: '5cfe3c65ea821930af69281f',
        });
        break;
      case 2:
        this.props.navigation.navigate('Sofa', {
          id: '5cfe3c5aea821930af69281e',
        });
        break;
      case 3:
        this.props.navigation.navigate('Chair', {
          id: '5cfe3c6fea821930af692820',
        });
        break;
      case 4:
        this.props.navigation.navigate('Almirah', {
          id: '5d14c15101ae103e6e94fbe0',
        });
    }
  };

  render() {
    const stateData = this.state.dataSource;
    let res = stateData.map(a => a.product_image);

    let url = 'http://180.149.241.208:3022/';
    const ele = res.map(el => {
      return url.concat(el);
    });

    const screenWidth = Dimensions.get('window').width;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <SliderBox
              images={ele}
              sliderBoxHeight={300}
              autoplay
              circleLoop
              onCurrentImagePressed={index => this.imageslider(index)}
              resizeMode={'cover'}
            />
          </View>

          <View style={{flex: 1, marginTop: 25, width: screenWidth}}>
            <FlatList
              data={this.state.dataSource}
              numColumns={2}
              renderItem={({item}) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.productCategoryCard}
                      onPress={() => {
                        this.props.navigation.navigate(item.category_name, {
                          id: item.category_id,
                        });
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
                        source={
                          item.category_name === 'Sofa'
                            ? images.sofaImage
                            : item.category_name === 'Bed'
                            ? images.bedImage
                            : item.category_name === 'Chair'
                            ? images.chairImage
                            : item.category_name === 'Almirah'
                            ? images.cupboardIcon
                            : images.tableImage
                        }
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

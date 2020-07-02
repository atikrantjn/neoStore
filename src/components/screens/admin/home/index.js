import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import styles from './styles';
import images from '../../../../utils/images';
import {BASE_URL, API_URL, request} from '../../../../config/api';
import {isEmptyObject} from '../../../../config/helpers';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  getCategoryData = () => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    request(
      this.categoryDataCallback,
      null,
      'GET',
      API_URL.GET_ALL_CATEGORIES,
      header,
    );
  };

  categoryDataCallback = {
    success: response => {
      this.setState({dataSource: response.category_details});
    },
    error: error => {
      console.log(error, 'rrrr');
    },
  };

  componentDidMount = async () => {
    await this.getCategoryData();
  };

  imageslider = index => {
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

    const ele = res.map(el => {
      return BASE_URL.concat(el);
    });

    const {width, height} = Dimensions.get('window');
    let arr = this.state.dataSource;

    if (arr.length % 2 !== 0) {
      arr.push({});
    }
    return (
      <View style={styles.container}>
        <View>
          <SliderBox
            images={ele}
            sliderBoxHeight={300}
            autoplay
            circleLoop
            onCurrentImagePressed={index => this.imageslider(index)}
            resizeMode={'contain'}
          />
        </View>

        <View style={{flex: 1, width: width}}>
          <FlatList
            data={this.state.dataSource}
            numColumns={2}
            renderItem={({item}) => {
              if (isEmptyObject(item)) {
                return <View style={{flex: 1, padding: 5}} />;
              }
              return (
                <View style={{flex: 1, padding: 5}}>
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
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

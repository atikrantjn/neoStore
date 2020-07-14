import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import styles from './styles';
import images from '../../../../utils/images';
import {BASE_URL, API_URL, request} from '../../../../config/api';
import {isEmptyObject} from '../../../../config/helpers';

import ModalLoader from '../../../custom/modalLoader/index';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isLoading: false,
    };
  }

  getCategoryData = () => {
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    this.setState({isLoading: true});

    setTimeout(() => {
      request(
        this.categoryDataCallback,
        null,
        'GET',
        API_URL.GET_ALL_CATEGORIES,
        header,
      );
    }, 3000);
  };

  categoryDataCallback = {
    success: response => {
      this.setState({dataSource: response.category_details, isLoading: false});
    },
    error: error => {
      Alert.alert('Error', error.message);
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

    const {width} = Dimensions.get('window');

    let arr = this.state.dataSource;

    if (arr.length % 2 !== 0) {
      arr.push({});
    }
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ModalLoader isLoading={this.state.isLoading} />
        ) : null}
        <View style={{width: width}}>
          <SliderBox
            images={ele}
            sliderBoxHeight={250}
            autoplay
            circleLoop
            onCurrentImagePressed={index => this.imageslider(index)}
            resizeMode="cover"
          />
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.dataSource}
            numColumns={2}
            renderItem={({item}) => {
              if (isEmptyObject(item)) {
                return <View style={styles.emptyCard} />;
              }
              return (
                <View style={styles.renderContainer}>
                  <TouchableOpacity
                    style={styles.productCategoryCard}
                    onPress={() => {
                      this.props.navigation.navigate(item.category_name, {
                        id: item.category_id,
                      });
                    }}>
                    <Text style={styles.renderCategoryName}>
                      {item.category_name}
                    </Text>
                    <Image
                      style={styles.renderCategoryIcon}
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

import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import styles from './styles';
import images from '../../../../utils/images';
import {myarrImages} from '../../../../utils/images';

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
    // console.log(this.state.dataSource);
    const imageData = this.state.dataSource;
    let res = imageData.map(a => a.product_image);

    console.log(res[0]);

    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <SliderBox
              images={myarrImages}
              sliderBoxHeight={300}
              autoplay
              circleLoop
            />
          </View>

          <View style={{flex: 1, marginTop: 25}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity style={styles.productCategoryCard}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 35,
                    textAlign: 'center',
                  }}>
                  Tables
                </Text>
                <Image
                  style={{width: 90, height: 90, marginLeft: 25}}
                  source={images.tableImage}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.productCategoryCard}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 35,
                    textAlign: 'center',
                  }}>
                  Sofas
                </Text>
                <Image
                  style={{width: 90, height: 90, marginLeft: 25}}
                  source={images.sofaImage}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 25,
                marginBottom: 25,
              }}>
              <TouchableOpacity style={styles.productCategoryCard}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 35,
                    textAlign: 'center',
                  }}>
                  Chairs
                </Text>
                <Image
                  style={{width: 90, height: 90, marginLeft: 25}}
                  source={images.chairImage}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.productCategoryCard}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 35,
                    textAlign: 'center',
                  }}>
                  Bed
                </Text>
                <Image
                  style={{width: 90, height: 90, marginLeft: 25}}
                  source={images.bedImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

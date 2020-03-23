import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {BASE_URL, API_URL, request} from '../../../config/api';
import RenderProductItem from './renderProductItem';

import styles from './styles';
// import * as contants from '../../../utils/contants';
import StarRating from 'react-native-star-rating';

export default class ProductListModule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const id = this.props.id;
    const data = null;
    const header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    request(
      this.productListCallBack,
      data,
      'GET',
      API_URL.PRODUCT_LIST_API + id,
      header,
    );
  }

  productListCallBack = {
    success: response => {
      this.setState({data: response.product_details});
    },
    error: error => {
      console.log('errr', error);
    },
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#B4B4B4',
        }}
      />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => {
            <RenderProductItem
              productId={item.product_id}
              product_image={item.product_image}
              product_name={item.product_name}
              product_material={item.product_material}
              product_cost={item.product_cost}
              rating={item.product_rating}
            />;
            // <ScrollView>
            //   <View style={styles.listContainer}>
            //     <TouchableOpacity
            //       styles={styles.list}
            //       onPress={() => {
            //         this.props.navigation.navigate('ProductDetails', {
            //           productId: item.product_id,
            //         });
            //       }}>
            //       <View style={styles.imageContainer}>
            //         <Image
            //           style={styles.image}
            //           source={{
            //             uri: BASE_URL + item.product_image,
            //           }}
            //         />
            //         <View style={{flexDirection: 'column'}}>
            //           <Text numberOfLines={1} style={styles.listText}>
            //             {item.product_name}
            //           </Text>
            //           <Text numberOfLines={1} style={styles.listSubText}>
            //             {item.product_material}
            //           </Text>
            //           <View style={styles.productCostContainer}>
            //             <Text style={styles.productCost}>
            //               {'Rs' + ' ' + item.product_cost}
            //             </Text>
            //             <StarRating
            //               disabled={false}
            //               maxStars={5}
            //               rating={item.product_rating}
            //               fullStarColor={'#CD9922'}
            //               starSize={20}
            //             />
            //           </View>
            //         </View>
            //       </View>
            //     </TouchableOpacity>
            //   </View>
            // </ScrollView>
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

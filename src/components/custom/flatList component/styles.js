import {StyleSheet, Dimensions} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  listText: {
    fontSize: 28,
    marginHorizontal: 15,
    width: 250,
  },
  listSubText: {
    fontSize: 15,
    marginHorizontal: 15,
    width: 250,
    color: '#A09F9F',
  },
  productCost: {
    marginHorizontal: 15,
    fontSize: 20,
    color: 'red',
  },
});
export default styles;

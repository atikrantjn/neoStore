import {StyleSheet, Dimensions} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  listContainer: {flex: 1},
  listText: {
    fontSize: 24,
    paddingHorizontal: 15,
    width: deviceWidth - 120,
    fontWeight: 'bold',
    color: '#666363',
  },
  listSubText: {
    fontSize: 18,
    paddingHorizontal: 15,
    width: 250,
    color: '#808080',
  },

  imageContainer: {
    flexDirection: 'row',
    padding: 10,
  },

  productCost: {
    marginHorizontal: 15,
    fontSize: 20,
    color: 'red',
  },

  image: {
    flex: 1,
  },

  productCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});
export default styles;

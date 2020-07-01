import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },

  listContainer: {
    flexDirection: 'row',
  },

  imageStyle: {
    flex: 1,
  },
  productNameContainer: {flexDirection: 'column', marginHorizontal: 15},

  productName: {
    fontSize: 25,
    flex: 1,
  },

  productMaterial: {
    fontSize: 20,
    width: 250,
    color: '#A09F9F',
  },

  productCostContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  productQty: {
    fontSize: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  productCost: {
    fontSize: 20,
  },
  itemSeperator: {
    height: 2,
    width: '100%',
    backgroundColor: '#B4B4B4',
  },
  moduleSeperatorline: {
    borderBottomWidth: 3,
    height: 10,
    borderColor: '#D5D5D5',
  },
});
export default styles;

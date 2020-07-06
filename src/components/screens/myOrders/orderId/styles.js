import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
  },

  imageStyle: {
    flex: 0.3,
  },
  productNameContainer: {
    flexDirection: 'column',
    marginHorizontal: 15,
    flex: 0.7,
  },

  productName: {
    fontSize: 22,
  },

  productMaterial: {
    fontSize: 18,
    width: 250,
    color: '#A09F9F',
  },

  productCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productQty: {
    fontSize: 18,
  },

  productCost: {
    fontSize: 18,
  },
  itemSeperator: {
    height: 2,
    width: '100%',
    backgroundColor: '#B4B4B4',
  },
  moduleSeperatorline: {
    borderBottomWidth: 3,
    height: 10,
    borderColor: '#B4B4B4',
  },
});
export default styles;

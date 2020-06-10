import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },

  listContainer: {
    flexDirection: 'row',
    // margin: 10,
  },

  imageStyle: {
    width: 80,
    height: 80,
  },
  productNameContainer: {flexDirection: 'column', marginHorizontal: 15},

  productName: {
    fontSize: 25,
    width: 260,
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
    // marginVertical: 15,
  },

  productCost: {
    fontSize: 20,
  },

  footerComponentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

    margin: 20,
  },

  footerPrice: {fontSize: 25},

  footerOrderBTN: {
    backgroundColor: 'red',
    borderRadius: 7,
    padding: 7,
    height: 50,
  },

  footerBTNtext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  itemSeperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#B4B4B4',
  },
});

export default styles;

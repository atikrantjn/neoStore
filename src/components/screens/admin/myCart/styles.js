import {StyleSheet} from 'react-native';
import appcolors from '../../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
  },

  listContainer: {
    flexDirection: 'row',
    flex: 0.8,
  },

  imageStyle: {
    flex: 0.3,
  },
  productNameContainer: {
    flexDirection: 'column',
    paddingLeft: 15,
    flex: 0.6,
  },

  productName: {
    fontSize: 20,
  },

  productMaterial: {
    fontSize: 18,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },

  footerPrice: {fontSize: 20},

  footerOrderBTN: {
    backgroundColor: appcolors.themeColor,
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  footerBTNtext: {
    fontSize: 20,

    color: 'white',
    textAlign: 'center',
  },

  itemSeperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#B4B4B4',
  },
  removeBTN: {
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: appcolors.themeColor,
  },
  removeBTNText: {
    fontSize: 15,

    color: 'white',
    textAlign: 'center',
  },
});

export default styles;

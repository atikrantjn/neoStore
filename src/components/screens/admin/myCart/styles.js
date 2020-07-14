import {StyleSheet} from 'react-native';
import appcolors from '../../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {flex: 1},

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  emptyText: {fontSize: 24, textAlign: 'center'},

  listMainContainer: {flex: 1, flexDirection: 'column'},

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
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: appcolors.themeColor,
  },
  removeBTNText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },

  removeBtnContainer: {flex: 0.2, alignSelf: 'center', marginEnd: 5},
});

export default styles;

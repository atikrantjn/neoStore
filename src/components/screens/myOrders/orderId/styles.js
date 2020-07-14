import {StyleSheet, Dimensions} from 'react-native';
let {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {flex: 1},

  headerContainer: {width: width, height: height - 80},

  renderContainer: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
  },

  renderImageStyle: {
    flex: 0.3,
  },
  renderProductNameContainer: {
    flexDirection: 'column',
    marginHorizontal: 15,
    flex: 0.7,
  },

  renderProductName: {
    fontSize: 22,
  },

  renderProductMaterial: {
    fontSize: 18,
    width: 250,
    color: '#A09F9F',
  },

  renderProductCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  renderProductQty: {
    fontSize: 18,
  },

  renderProductCost: {
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

  footerContainer: {
    width: width,
    height: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerTotalContainer: {marginLeft: 20},

  footerTotalText: {fontSize: 28},

  footerPriceContainer: {marginRight: 20},

  footerPriceText: {fontSize: 25},
});
export default styles;

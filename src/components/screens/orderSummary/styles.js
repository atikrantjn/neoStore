import {StyleSheet, Dimensions} from 'react-native';
import appcolors from '../../../utils/colors';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  userDetailContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 0.2,
    marginHorizontal: 22,
    marginVertical: 15,
  },

  userName: {
    fontSize: 22,
  },

  userAddressContainer: {
    marginVertical: 10,
  },

  userAddress: {fontSize: 18, fontStyle: 'italic'},

  changeAddressBTNcontainer: {
    marginVertical: 10,
  },

  changeAddressBTN: {
    backgroundColor: appcolors.themeColor,
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },

  changeAddressBTNtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  moduleSeperatorline: {
    borderBottomWidth: 3,
    height: 5,
    borderColor: '#D5D5D5',
  },

  flatListMainContainer: {
    flex: 0.4,
  },

  flatListEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatListEmptyText: {fontSize: 28, textAlign: 'center'},

  productDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    // margin: 25,
  },

  renderFirstRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  rendetSecondRowContainer: {
    flexDirection: 'row',

    justifyContent: 'space-around',
    flex: 1,
  },

  productCost: {
    fontSize: 20,
  },

  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
    marginVertical: 5,
  },

  quantityItemText: {
    fontSize: 18,
  },

  footerContainer: {
    flexDirection: 'column',
    flex: 0.1,
    marginHorizontal: '5%',
  },

  footerPriceDetails: {
    fontSize: 19,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  productCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productPrice: {fontSize: 22, color: 'black'},

  orderSummaryFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 22,
    flex: 0.1,
  },

  orderNowBTN: {
    backgroundColor: appcolors.themeColor,
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  orderNowBTNtext: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },

  /////ddjfhjdfhjdhfj

  rendercontainer: {
    marginHorizontal: 22,
    flex: 1,
  },

  renderlistContainer: {
    flexDirection: 'row',
  },

  renderimageStyle: {
    flex: 0.3,
    height: 65,
  },

  renderproductName: {
    fontSize: 24,
    flex: 0.7,
  },

  renderproductMaterial: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#A09F9F',
    fontWeight: 'bold',
    flex: 1,
  },

  renderproductCostContainer: {
    marginVertical: 15,
    flex: 0.4,
  },

  renderproductCost: {
    fontSize: 15,
  },

  renderfooterComponentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

    margin: 20,
  },

  renderfooterPrice: {fontSize: 25},

  renderitemSeperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#B4B4B4',
    marginVertical: 5,
  },
  minusBtn: {
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 2,
    textAlign: 'center',
  },
  plusBtn: {
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 2,
    textAlign: 'center',
  },
  removeBTN: {
    borderRadius: 7,
    padding: 7,
    backgroundColor: 'red',
    height: 30,
  },
  removeBTNText: {
    fontSize: 15,

    color: 'white',
    textAlign: 'center',
  },
});

export default styles;

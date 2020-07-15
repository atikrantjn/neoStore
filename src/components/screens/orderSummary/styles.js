import {StyleSheet} from 'react-native';
import appcolors from '../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
    // backgroundColor: 'red',
  },
  userDetailContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 5,
  },

  userNameContainer: {paddingVertical: 2},

  userName: {
    fontSize: 22,
  },

  userAddressContainer: {
    marginVertical: 10,

    paddingVertical: 2,
  },

  userAddress: {fontSize: 18, fontStyle: 'italic'},

  changeAddressBTNcontainer: {
    marginVertical: 5,
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
    height: 1,
    width: '100%',
    backgroundColor: '#B4B4B4',
    marginVertical: 5,
  },

  flatListMainContainer: {
    flex: 1,
    // backgroundColor: 'red',
    marginVertical: 5,
  },

  flatListEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatListEmptyText: {fontSize: 28, textAlign: 'center'},

  rendercontainer: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: 'column',
  },

  renderFirstRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  renderproductName: {
    fontSize: 22,
    flex: 0.8,
  },

  renderimageStyle: {
    width: 100,
    height: 60,
  },

  renderSecondRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },

  renderproductMaterial: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#A09F9F',
    fontWeight: 'bold',
    flex: 1,
  },

  renderproductCostContainer: {
    marginVertical: 15,
    flex: 1,
    alignItems: 'flex-end',
  },

  productCost: {
    fontSize: 20,
  },

  renderQuantity: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  quantityContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },

  quantityItemText: {
    fontSize: 18,
    paddingHorizontal: 20,
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

  removeBtnContainer: {
    flex: 0.4,
  },

  footerContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    flex: 1,
    marginVertical: 5,
  },

  footerPriceDetails: {
    fontSize: 18,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  productCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  gstCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  subTotalCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  productPrice: {fontSize: 18.5, color: 'black'},

  orderSummaryFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
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

  totalProductPrice: {
    fontSize: 22,
    color: 'black',
  },

  /////ddjfhjdfhjdhfj

  renderitemSeperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#B4B4B4',
    marginVertical: 2,
  },
});

export default styles;

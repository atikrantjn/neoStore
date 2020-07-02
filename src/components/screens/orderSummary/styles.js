import {StyleSheet, Dimensions} from 'react-native';
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
    height: '30%',
    marginHorizontal: '5%',
  },

  userName: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  userAddressContainer: {
    paddingTop: 15,
  },

  userAddress: {fontSize: 22, fontWeight: 'bold'},

  changeAddressBTNcontainer: {
    marginTop: 15,
  },

  changeAddressBTN: {
    backgroundColor: 'red',
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
    height: 10,
    borderColor: '#D5D5D5',
  },

  flatListMainContainer: {
    height: '50%',
  },

  flatListEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flatListEmptyText: {fontSize: 40, textAlign: 'center'},

  productDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    // margin: 25,
  },

  renderFirstRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  rendetSecondRowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  productNameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productNameDetailsContainer: {
    width: '50%',
  },

  productName: {
    fontSize: 30,
  },

  productImage: {
    flex: 1,
  },

  productPriceDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },

  productMaterialContainer: {
    width: '50%',
  },

  productMaterial: {
    fontSize: 28,
  },

  productCost: {
    fontSize: 22,
  },

  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  quantityItemText: {
    fontSize: 19,
    padding: 5,
  },

  footerContainer: {
    flexDirection: 'column',
    height: '15%',
  },

  footerPriceDetails: {
    fontSize: 25,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  productCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },

  productPrice: {fontSize: 25, fontWeight: 'bold', color: 'black'},

  orderSummaryFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,

    marginHorizontal: '5%',
    height: '10%',
  },

  orderNowBTN: {
    backgroundColor: 'red',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  orderNowBTNtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  /////ddjfhjdfhjdhfj

  rendercontainer: {
    // padding: 10,
    marginVertical: '5%',
    marginHorizontal: '5%',
  },

  renderlistContainer: {
    flexDirection: 'row',
    // margin: 10,
  },

  renderimageStyle: {
    flex: 1,
    height: 80,
    width: '50%',
  },
  renderproductNameContainer: {flexDirection: 'column', marginHorizontal: 15},

  renderproductName: {
    fontSize: 25,
    width: '60%',
    fontWeight: 'bold',
  },

  renderproductMaterial: {
    fontSize: 20,

    color: '#A09F9F',
    fontWeight: 'bold',
  },

  renderproductCostContainer: {
    marginVertical: 15,
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
  },
  minusBtn: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    marginHorizontal: 15,
  },
  plusBtn: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    marginHorizontal: 15,
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

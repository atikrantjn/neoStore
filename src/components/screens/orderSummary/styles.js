import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  userDetailContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 15,
  },

  userName: {
    fontSize: 32,
  },

  userAddressContainer: {
    marginTop: 15,
  },

  userAddress: {fontSize: 25},

  changeAddressBTNcontainer: {
    marginTop: 15,
  },

  changeAddressBTN: {backgroundColor: 'red', borderRadius: 7, padding: 7},

  changeAddressBTNtext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  moduleSeperatorline: {
    borderBottomWidth: 3,
    height: 10,
    borderColor: '#D5D5D5',
  },

  productDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 25,
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
    width: 125,
    height: 122,
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
    fontSize: 30,
  },

  productCost: {
    fontSize: 30,
  },

  footerContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 25,
  },
  footerPriceDetailsContainer: {
    flex: 1,
  },

  footerPriceDetails: {
    fontSize: 28,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  productCostContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },

  productPrice: {fontSize: 25},

  orderSummaryFooterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },

  orderNowBTN: {
    backgroundColor: 'red',
    borderRadius: 7,
    padding: 7,
  },

  orderNowBTNtext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  /////ddjfhjdfhjdhfj

  rendercontainer: {
    flex: 1,
    margin: 10,
  },

  renderlistContainer: {
    flexDirection: 'row',
    // margin: 10,
  },

  renderimageStyle: {
    width: 80,
    height: 80,
  },
  renderproductNameContainer: {flexDirection: 'column', marginHorizontal: 15},

  renderproductName: {
    fontSize: 25,
    width: 260,
  },

  renderproductMaterial: {
    fontSize: 20,
    width: 250,
    color: '#A09F9F',
  },

  renderproductCostContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // marginVertical: 15,
  },

  renderproductCost: {
    fontSize: 20,
  },

  renderfooterComponentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

    margin: 20,
  },

  renderfooterPrice: {fontSize: 25},

  renderfooterOrderBTN: {
    backgroundColor: 'red',
    borderRadius: 7,
    padding: 7,
    height: 50,
  },

  renderfooterBTNtext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  renderitemSeperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#B4B4B4',
  },
  minusBtn: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
  },
  plusBtn: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    marginLeft: 10,
  },
});

export default styles;

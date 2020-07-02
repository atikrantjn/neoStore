import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  userDetailContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: '5%',
  },

  userName: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  userAddressContainer: {
    paddingTop: 15,
  },

  userAddress: {fontSize: 25, fontWeight: 'bold'},

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
    fontSize: 22,
  },

  footerContainer: {
    flexDirection: 'column',
    flex: 0.5,
  },

  footerPriceDetails: {
    fontSize: 25,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    marginHorizontal: '5%',
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
    alignItems: 'flex-end',
    margin: 10,
    marginHorizontal: '5%',
    flex: 0.5,
  },

  orderNowBTN: {
    backgroundColor: 'red',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 14,
  },

  orderNowBTNtext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  /////ddjfhjdfhjdhfj

  rendercontainer: {
    // padding: 10,

    marginVertical: 10,
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
    width: 250,
    color: '#A09F9F',
    fontWeight: 'bold',
  },

  renderproductCostContainer: {
    flex: 1,
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

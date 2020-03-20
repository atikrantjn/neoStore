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
    justifyContent: 'space-between',
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
});

export default styles;

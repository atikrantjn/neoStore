import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    borderBottomWidth: 2,
    borderBottomColor: '#D5D5D5',
  },
  productNameContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  productName: {fontSize: 35},

  categoryNameContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },

  categoryName: {
    fontSize: 25,
  },

  modalMainContainer: {
    marginTop: 22,
  },
  modalDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalProductNameContainer: {
    height: 300,
    width: '75%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#DBB4B4',
  },
  modalProductName: {
    fontSize: 35,
    textAlign: 'center',
  },

  modalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalImage: {
    width: '50%',
    height: '70%',
  },

  modalStarContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalUpdateRatingBTN: {
    borderRadius: 7,
    backgroundColor: '#fe3f3f',
    width: '100%',
    height: 40,
    marginTop: 15,
  },

  productDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },

  productMaterial: {
    fontSize: 20,
  },

  productCostContainer: {
    flex: 1,
    backgroundColor: 'white',
    height: 400,
    margin: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#D5D5D5',
  },
  productCostRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productCost: {
    fontSize: 35,
    color: 'red',
  },

  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '50%',
    height: '70%',
  },

  productDescriptionContainer: {
    flex: 1,
    margin: 15,
    flexDirection: 'column',
  },
  descriptionText: {
    fontSize: 35,
  },

  addToCartIcon: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 35,
  },

  productDescription: {
    fontSize: 18,
  },

  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between',
  },

  buyNowBTN: {
    borderRadius: 7,
    backgroundColor: 'red',
    width: 150,
    height: 50,
  },
  buyNowBTNtext: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },

  rateNowBTN: {
    borderRadius: 7,
    backgroundColor: '#B7B7B7',
    width: 150,
    height: 50,
  },
  rateNowBTNtext: {
    textAlign: 'center',
    fontSize: 30,
  },
});

export default styles;
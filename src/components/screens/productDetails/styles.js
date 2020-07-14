import {StyleSheet} from 'react-native';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    borderBottomWidth: 2,
    borderBottomColor: '#D5D5D5',
  },

  mainProductNameContainer: {margin: 15, flex: 1},
  productNameContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  productName: {fontSize: 35, fontWeight: 'bold', color: '#666363'},

  categoryNameContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
  },

  categoryName: {
    fontSize: 20,
  },

  modalMainContainer: {
    marginTop: 22,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
    zIndex: 1000,
  },
  modalProductName: {
    fontSize: 28,
    textAlign: 'center',
  },

  modalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalImage: {
    width: '60%',
    height: '80%',
  },

  modalStarContainer: {
    flex: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalUpdateRatingBTN: {
    borderRadius: 7,
    backgroundColor: '#fe3f3f',
    paddingVertical: 8,
    paddingHorizontal: 35,
  },

  modalRateNowText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },

  modalStarStyle: {
    padding: 5,
  },

  modalVisiblityStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1,
    backgroundColor: '#06060694',
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

  shareIconStyle: {color: '#989898'},

  productCostContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 15,

    shadowColor: '#000',

    elevation: 5,
    borderRadius: 10,
  },
  productCostRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  moduleSeperatorline: {
    borderBottomWidth: 3,
    height: 10,
    borderColor: '#D5D5D5',
  },

  productCost: {
    fontSize: 25,
    color: colors.themeColor,
  },

  subImageList: {marginHorizontal: 5},

  subImageMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  subImageContainer: {borderWidth: 1, borderColor: 'black'},

  subImageStyle: {width: 110, height: 120},

  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 180,
  },

  productDescriptionContainer: {
    flex: 1,
    marginLeft: 25,
    flexDirection: 'column',
    marginHorizontal: '5%',
    marginVertical: '5%',
  },

  descriptionViewStyle: {flexDirection: 'row'},

  descriptionText: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  addToCartIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1000,
    elevation: 24,
  },

  cartIconStyle: {
    backgroundColor: '#3089AB',
    color: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  productDescription: {
    fontSize: 18,
  },

  footerContainer: {
    flexDirection: 'row',
    margin: 22,
    justifyContent: 'space-between',
  },

  buyNowBTN: {
    borderRadius: 7,
    backgroundColor: colors.themeColor,
    paddingVertical: 8,
    paddingHorizontal: 35,
  },
  buyNowBTNtext: {
    fontSize: 20,
    color: 'white',
  },

  rateNowBTN: {
    borderRadius: 7,
    backgroundColor: '#B7B7B7',
    paddingVertical: 8,
    paddingHorizontal: 45,
  },
  rateNowBTNtext: {
    fontSize: 20,
    color: 'white',
  },
});

export default styles;

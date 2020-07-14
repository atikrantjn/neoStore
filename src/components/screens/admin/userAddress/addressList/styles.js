import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../../../utils/colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {flex: 1},

  shippingAddressContainer: {flex: 1, flexDirection: 'column'},

  shippingAddressText: {fontSize: 22, margin: 15, color: '#8B8888'},

  seperator: {
    height: 2,
    width: '100%',
    backgroundColor: '#b4b4b4',
  },

  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  emptyText: {fontSize: 20, textAlign: 'center'},

  renderMainContainer: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    marginVertical: 10,
  },
  renderRadioContainer: {marginTop: 30, marginHorizontal: 10},

  renderAddressContainer: {flex: 1},

  renderAddressRow: {flexDirection: 'column'},

  renderNameText: {marginHorizontal: 10, fontSize: 20},

  renderAddressRowContainer: {flexDirection: 'row'},

  renderAddressText: {
    marginHorizontal: 10,
    fontSize: 18,
    width: '70%',
  },

  renderRemoveBtnContainer: {
    borderRadius: 7,
    padding: 7,
    backgroundColor: colors.themeColor,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  removeBtnText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },

  renderPinCountryText: {
    marginHorizontal: 10,
    fontSize: 18,
  },

  footerContainer: {marginHorizontal: 15},

  footerBtnContainer: {
    backgroundColor: colors.themeColor,
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginVertical: 10,
  },

  footerBtnText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import colors from '../../../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e6e6e6',
    flex: 1,
  },

  container: {
    flex: 0.9,
  },
  addressContainer: {
    flexDirection: 'column',
  },

  addressText: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 20,
  },

  addressTextInput: {
    marginHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 15,
    paddingHorizontal: 15,

    shadowOffset: {
      width: 0,
      height: 0.5,
    },

    elevation: 5,
  },

  landmarkContainer: {flexDirection: 'column'},

  landmarkText: {marginLeft: 15, fontSize: 20, marginTop: 10},

  landmarkTextInput: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 15,
    height: 40,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },

    elevation: 5,
    paddingHorizontal: 15,
  },

  cityStateContainer: {
    flexDirection: 'row',
  },

  cityTextContainer: {flex: 0.5, flexDirection: 'column'},
  cityText: {marginLeft: 15, fontSize: 20},
  cityTextInput: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 15,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },

    elevation: 5,
    height: 40,
    paddingHorizontal: 15,
  },

  stateTextContainer: {flex: 0.5, flexDirection: 'column'},
  stateText: {marginLeft: 15, fontSize: 20},
  stateTextInput: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 15,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },

    elevation: 5,
    height: 40,
    paddingHorizontal: 15,
  },

  zipCountryContainer: {flex: 1, flexDirection: 'row', marginBottom: 15},

  zipContainer: {flex: 1, flexDirection: 'column'},
  zipText: {marginLeft: 15, fontSize: 20},
  zipTextInput: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 15,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },

    elevation: 5,
    height: 40,
    paddingHorizontal: 15,
  },

  countryContainer: {flex: 1, flexDirection: 'column'},
  countryText: {marginLeft: 15, fontSize: 20},
  countryTextInput: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 15,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },

    elevation: 5,
    height: 40,
    paddingHorizontal: 15,
  },

  saveAddressBtnBg: {
    marginTop: 15,
    backgroundColor: colors.themeColor,
    borderRadius: 7,
    paddingVertical: 8,
  },

  saveAddressBtnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },

  errorText: {fontSize: 15, color: 'red', marginLeft: 15},

  footerContainer: {flex: 0.1},

  footerBtnRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    marginBottom: 15,
  },

  footerBtnContainer: {flex: 0.5, marginHorizontal: 15},
});

export default styles;

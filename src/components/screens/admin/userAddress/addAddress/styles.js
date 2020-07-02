import {StyleSheet} from 'react-native';
import colors from '../../../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e6e6e6',
    flex: 1,
    height: '100%',
  },

  container: {
    flexDirection: 'column',
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
    fontSize: 18,
    paddingHorizontal: 15,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,

    elevation: 8,
  },

  landmarkContainer: {flexDirection: 'column'},

  landmarkText: {marginLeft: 15, fontSize: 20, marginTop: 10},

  landmarkTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 20,
    height: 32,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,

    elevation: 8,
    paddingHorizontal: 15,
  },

  cityStateContainer: {
    flexDirection: 'row',
  },

  cityTextContainer: {flex: 0.5, flexDirection: 'column'},
  cityText: {marginLeft: 15, fontSize: 20},
  cityTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,

    elevation: 8,
    height: 32,
    paddingHorizontal: 15,
  },

  stateTextContainer: {flex: 0.5, flexDirection: 'column'},
  stateText: {marginLeft: 15, fontSize: 20},
  stateTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,

    elevation: 8,
    height: 32,
    paddingHorizontal: 15,
  },

  zipCountryContainer: {flex: 1, flexDirection: 'row', marginBottom: 25},

  zipContainer: {flex: 1, flexDirection: 'column'},
  zipText: {marginLeft: 15, fontSize: 20},
  zipTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,

    elevation: 8,
    height: 32,
    paddingHorizontal: 15,
  },

  countryContainer: {flex: 1, flexDirection: 'column'},
  countryText: {marginLeft: 15, fontSize: 20},
  countryTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 18,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,

    elevation: 8,
    height: 32,
    paddingHorizontal: 15,
  },

  saveAddressBtnBg: {
    marginTop: 15,
    backgroundColor: colors.themeColor,
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },

  saveAddressBtnText: {
    fontSize: 20,

    color: 'white',
    textAlign: 'center',
  },
});

export default styles;

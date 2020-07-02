import {StyleSheet} from 'react-native';
import colors from '../../../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#EBEDEF',
    flex: 1,
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
    fontSize: 25,
  },

  addressTextInput: {
    marginHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 18,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,

    elevation: 8,
  },

  landmarkContainer: {flexDirection: 'column'},

  landmarkText: {marginLeft: 15, fontSize: 25, marginTop: 10},

  landmarkTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,

    elevation: 8,
  },

  cityStateContainer: {
    flexDirection: 'row',
  },

  cityTextContainer: {flex: 0.5, flexDirection: 'column'},
  cityText: {marginLeft: 15, fontSize: 25},
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
  },

  stateTextContainer: {flex: 0.5, flexDirection: 'column'},
  stateText: {marginLeft: 15, fontSize: 25},
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
  },

  zipCountryContainer: {flex: 1, flexDirection: 'row', marginBottom: 25},

  zipContainer: {flex: 1, flexDirection: 'column'},
  zipText: {marginLeft: 15, fontSize: 25},
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
  },

  countryContainer: {flex: 1, flexDirection: 'column'},
  countryText: {marginLeft: 15, fontSize: 25},
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
  },

  saveAddressBtnBg: {
    marginTop: 15,
    backgroundColor: colors.themeColor,
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 45,
  },

  saveAddressBtnText: {
    fontSize: 22,

    color: 'white',
    textAlign: 'center',
  },
});

export default styles;

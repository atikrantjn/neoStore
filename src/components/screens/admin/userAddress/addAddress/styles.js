import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#d5d5d5',
    flex: 1,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  addressText: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 30,
  },

  addressTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 20,
  },

  landmarkContainer: {flex: 1, flexDirection: 'column'},

  landmarkText: {marginLeft: 15, marginTop: 10, fontSize: 30},

  landmarkTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 20,
  },

  cityStateContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  cityTextContainer: {flex: 1, flexDirection: 'column'},
  cityText: {marginLeft: 15, marginTop: 10, fontSize: 30},
  cityTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 18,
  },

  stateTextContainer: {flex: 1, flexDirection: 'column'},
  stateText: {marginLeft: 15, marginTop: 10, fontSize: 30},
  stateTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 18,
  },

  zipCountryContainer: {flex: 1, flexDirection: 'row'},

  zipContainer: {flex: 1, flexDirection: 'column'},
  zipText: {marginLeft: 15, marginTop: 10, fontSize: 30},
  zipTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 18,
  },

  countryContainer: {flex: 1, flexDirection: 'column'},
  countryText: {marginLeft: 15, marginTop: 10, fontSize: 30},
  countryTextInput: {
    margin: 15,
    backgroundColor: 'white',
    fontSize: 18,
  },

  saveAddressBtnBg: {
    marginTop: 15,
    backgroundColor: 'red',
    borderRadius: 7,
    height: 60,
    padding: 5,
  },

  saveAddressBtnText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;

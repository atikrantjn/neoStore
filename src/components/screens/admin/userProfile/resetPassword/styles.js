import {StyleSheet, Dimensions} from 'react-native';
import appColors from '../../../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.themeColor,
  },
  neostoreHeader: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 25,
  },

  inputContainer: {flex: 1},
  forgotText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  registerInput: {
    marginHorizontal: 50,
    marginTop: 25,
    height: 50,
    marginBottom: 10,
  },

  input: {
    paddingLeft: '16%',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 20,
  },

  customBtnBG: {
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  customBtnText: {
    fontSize: 18,

    color: 'red',
    textAlign: 'center',
  },

  iconStyle: {
    position: 'absolute',
    top: 12,
    left: 20,
    color: 'white',
  },

  rightIconStyle: {
    position: 'absolute',
    top: 12,
    right: 20,
    color: 'white',
  },

  errortext: {color: 'white'},

  footerContainer: {marginHorizontal: 50, marginBottom: 10},
});

export default styles;

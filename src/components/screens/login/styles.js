import {StyleSheet} from 'react-native';
import appColors from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.themeColor,
    justifyContent: 'center',
  },

  neostoreHeader: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: 'bold',
  },

  loginInput: {
    marginHorizontal: 50,
    marginTop: 25,
  },

  input: {
    paddingLeft: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 22,
  },

  customBtnBG: {
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  customBtnText: {
    fontSize: 20,

    color: appColors.themeColor,
    textAlign: 'center',
  },

  forgotPassword: {
    marginTop: 10,
  },
  forgotText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
  },
  accountText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  plusSignContainer: {
    marginRight: 20,
    backgroundColor: '#000',
    opacity: 0.3,
    padding: 3.8,
  },

  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 70,
  },

  iconStyle: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
  },

  errorText: {color: 'white'},

  plusIcon: {width: 30, height: 30},
});

export default styles;

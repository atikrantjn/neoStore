import {StyleSheet} from 'react-native';
import appColors from '../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: appColors.themeColor,
  },
  container: {
    flex: 1,
  },
  neostoreHeader: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  input: {
    paddingLeft: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 19,
    zIndex: -1,
  },
  registerInput: {
    marginHorizontal: 50,
    height: 45,
    marginVertical: 15,
  },

  iconStyle: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 50,
  },
  genderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  radioLabelStyle: {fontSize: 18, color: 'white'},

  checkbox: {
    marginHorizontal: 50,
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
  },
  registerFormBtn: {
    marginVertical: 15,
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  registerFormBtnText: {
    fontSize: 18,

    color: appColors.themeColor,
    textAlign: 'center',
  },

  termsConditionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  termsErrorText: {
    color: 'white',
    paddingHorizontal: 10,
  },

  footerBtnContainer: {marginHorizontal: 50},

  alertMessageStyle: {color: 'green', fontSize: 16},

  alertContainerStyle: {width: 350, height: 160},

  errorTextStyle: {color: 'white'},

  radioBtnStyle: {paddingHorizontal: 10},

  checkBoxStyle: {padding: 5},
});
export default styles;

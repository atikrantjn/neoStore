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
  input: {
    paddingLeft: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 22,
  },
  registerInput: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 25,
    height: 50,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  genderText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  checkbox: {
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
    height: 50,
    color: 'white',
  },
  customBtnBG: {
    backgroundColor: 'white',
    borderRadius: 7,
  },

  customBtnText: {
    fontSize: 32,
    fontWeight: '400',
    color: 'red',
    textAlign: 'center',
  },
});
export default styles;

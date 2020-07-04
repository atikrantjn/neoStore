import {StyleSheet, Dimensions} from 'react-native';
import appColors from '../../../utils/colors';
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.themeColor,
  },
  neostoreHeader: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: 'bold',
    marginVertical: 25,
  },
  forgotText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  registerInput: {
    height: 45,
    marginVertical: 20,
  },

  input: {
    paddingLeft: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 19,
  },

  customBtnBG: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  customBtnText: {
    fontSize: 20,

    color: appColors.themeColor,
    textAlign: 'center',
  },
});

export default styles;

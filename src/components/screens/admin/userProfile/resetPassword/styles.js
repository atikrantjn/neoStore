import {StyleSheet, Dimensions} from 'react-native';
import appColors from '../../../../../utils/colors';
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
    fontSize: 28,
    fontWeight: 'bold',
  },

  input: {
    paddingLeft: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 22,
    width: screenWidth - 100,
    marginBottom: 35,
  },

  customBtnBG: {
    backgroundColor: 'white',
    borderRadius: 7,
    width: screenWidth - 100,
  },

  customBtnText: {
    fontSize: 32,
    fontWeight: '400',
    color: 'red',
    textAlign: 'center',
  },
});

export default styles;

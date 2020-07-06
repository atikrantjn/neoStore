import {StyleSheet} from 'react-native';
import appColors from '../../../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: appColors.themeColor, flex: 1},

  input: {
    paddingLeft: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 19,
  },
  registerInput: {
    marginHorizontal: 50,
    marginVertical: 8,
    height: 45,
  },
  customBtnBG: {
    backgroundColor: 'white',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 30,
  },

  customBtnText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
});
export default styles;

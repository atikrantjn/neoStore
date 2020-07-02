import {StyleSheet} from 'react-native';
import appColors from '../../../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: appColors.themeColor},
  container: {
    flex: 1,
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
    marginVertical: 10,
    height: 50,
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

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
    fontSize: 20,
  },
  registerInput: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 25,
    height: 50,
    marginBottom: 10,
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

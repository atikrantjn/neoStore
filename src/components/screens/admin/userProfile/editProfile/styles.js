import {StyleSheet} from 'react-native';
import appColors from '../../../../../utils/colors';
import {colors} from 'react-native-elements';

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
    marginHorizontal: 50,
    marginTop: 25,
    height: 50,
    marginBottom: 10,
  },
  saveProfileBtn: {
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },

  saveProfileBtnText: {
    fontSize: 18,

    color: 'red',
    textAlign: 'center',
  },
});
export default styles;

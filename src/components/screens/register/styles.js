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
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  genderText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
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

  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;

import {StyleSheet} from 'react-native';
import appColors from '../../../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: appColors.themeColor, flex: 1},

  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },

  imageStyle: {height: 150, width: 150, borderRadius: 100},

  iconStyle: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
  },

  input: {
    paddingLeft: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 18,
  },
  registerInput: {
    marginHorizontal: 50,
    marginVertical: 10,
    height: 50,
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

  errorText: {color: 'white'},

  datePickerStyle: {
    width: '100%',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
  },

  footerBtnContainer: {marginHorizontal: 50, marginBottom: 10},
});
export default styles;

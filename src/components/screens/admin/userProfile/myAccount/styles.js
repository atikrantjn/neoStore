import {StyleSheet} from 'react-native';
import appColors from '../../../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: appColors.themeColor, flex: 1},

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },

  image: {height: 130, width: 130, borderRadius: 65},
  input: {
    paddingLeft: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 1.5,
    fontSize: 19,
  },
  registerInput: {
    marginHorizontal: 50,
    marginVertical: 15,
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

  iconStyle: {
    position: 'absolute',
    top: 12,
    left: 10,
    color: 'white',
  },

  footerContainer: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 15,
  },
});
export default styles;

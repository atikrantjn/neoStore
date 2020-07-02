import {StyleSheet} from 'react-native';
import colors from '../../../utils/colors';
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  sideMenuProfileIcon: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    marginHorizontal: '28%',
    marginVertical: '5%',
  },
  customBtnBG: {
    backgroundColor: colors.themeColor,
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 45,
  },

  sideMenuProfileIconLog: {
    height: 320,
    width: 280,
  },

  customBtnText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;

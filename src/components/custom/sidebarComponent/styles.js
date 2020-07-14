import {StyleSheet} from 'react-native';
import colors from '../../../utils/colors';
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  mainContainer: {flexDirection: 'column'},
  sideMenuProfileIcon: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    marginHorizontal: '28%',
    marginVertical: '5%',
  },

  fullNameText: {textAlign: 'center', fontSize: 20},
  emailText: {textAlign: 'center', fontSize: 18},
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
  sideImageContainer: {flexDirection: 'column'},
  sideContainer_1: {
    width: '100%',
    height: 2,
    backgroundColor: '#e2e2e2',
    marginVertical: 15,
  },
  sideContainer_2: {
    width: '100%',
    height: 1,
    backgroundColor: '#e2e2e2',
  },

  drawerScrollViewStyle: {marginHorizontal: 15},

  listTitleStyle: {fontSize: 20},

  listIconStyle: {marginRight: 25, top: 9},

  accountTitleStyle: {fontSize: 18, marginLeft: 25, color: 'black'},

  loginRegisterTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 25,
  },

  loginRegisterIconStyle: {
    top: 8,
  },

  loginRegisterContainer: {justifyContent: 'center'},

  productTitleStyle: {fontSize: 20, marginLeft: 25, color: 'black'},

  productIconStyle: {marginLeft: 50, top: 5},

  storeLocatorTitle: {fontSize: 20},

  logoutBtnContainer: {marginVertical: 10},
});

export default styles;

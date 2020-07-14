import {StyleSheet, Dimensions} from 'react-native';
import appColors from '../../../utils/colors';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  itemSeperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#B4B4B4',
  },

  mainContainer: {
    height: 75,
    backgroundColor: appColors.themeColor,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {flex: 0.07, justifyContent: 'center'},

  iconStyle: {fontSize: 25, color: 'white'},

  inputContainerStyle: {flex: 1, justifyContent: 'center'},

  inputStyle: {
    backgroundColor: 'white',
    marginRight: 5,
    paddingLeft: 10,
  },

  spinnerStyle: {justifyContent: 'center', alignItems: 'center'},

  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyListText: {fontSize: 24, textAlign: 'center'},

  renderListContainer: {flex: 1},

  renderTouchable: {flex: 1},

  renderImageContainer: {
    flexDirection: 'row',
    width: deviceWidth,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  image: {
    flex: 0.25,
  },
  productDetailContainer: {flexDirection: 'column', flex: 0.75},

  listText: {
    fontSize: 22,
    marginHorizontal: 15,
  },
  listSubText: {
    fontSize: 16,
    marginHorizontal: 15,
    color: '#A09F9F',
  },

  productCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  productCost: {
    fontSize: 18,
    color: appColors.themeColor,
    marginHorizontal: 15,
  },
});

export default styles;

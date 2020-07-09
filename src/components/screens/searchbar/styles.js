import {StyleSheet, Dimensions} from 'react-native';
import appColors from '../../../utils/colors';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mainContainer: {
    height: 75,
    backgroundColor: appColors.themeColor,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  searchContainer: {
    height: 55,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  listContainer: {flex: 1},

  listText: {
    fontSize: 22,
    marginHorizontal: 15,
  },
  listSubText: {
    fontSize: 16,
    marginHorizontal: 15,

    color: '#A09F9F',
  },

  imageContainer: {
    flexDirection: 'row',
    width: deviceWidth,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  productCost: {
    fontSize: 18,
    color: appColors.themeColor,
    marginHorizontal: 15,
  },

  image: {
    flex: 0.25,
  },

  productCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default styles;

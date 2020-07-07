import {StyleSheet, Dimensions} from 'react-native';
import appColors from '../../../utils/colors';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mainContainer: {
    height: 80,
    backgroundColor: appColors.themeColor,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  searchContainer: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  listContainer: {flex: 1, margin: 10},
  listText: {
    fontSize: 28,
    marginHorizontal: 15,
    width: 250,
  },
  listSubText: {
    fontSize: 15,
    marginHorizontal: 15,
    width: 250,
    color: '#A09F9F',
  },

  imageContainer: {flexDirection: 'row', margin: 10, width: deviceWidth},

  productCost: {
    marginHorizontal: 15,
    fontSize: 20,
    color: 'red',
  },

  image: {
    width: 120,
    height: 120,
  },

  productCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});

export default styles;

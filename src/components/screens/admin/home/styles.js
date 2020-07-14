import {StyleSheet, Dimensions} from 'react-native';
import appColor from '../../../../utils/colors';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },

  productCategoryCard: {
    backgroundColor: appColor.themeColor,
    borderRadius: 10,
    padding: 10,
  },

  listContainer: {flex: 1, width: width, marginVertical: 10},

  emptyCard: {flex: 1, marginHorizontal: 10, marginVertical: 10},

  renderContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    width: width,
  },

  renderCategoryName: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },

  renderCategoryIcon: {
    width: 80,
    height: 75,
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 5,
  },
});
export default styles;

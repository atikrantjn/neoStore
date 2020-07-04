import {StyleSheet, Dimensions} from 'react-native';
import appColor from '../../../../utils/colors';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
  },

  productCategoryCard: {
    backgroundColor: appColor.themeColor,
    borderRadius: 10,
    padding: 10,
  },
});
export default styles;

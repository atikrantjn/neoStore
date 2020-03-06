import {StyleSheet, Dimensions} from 'react-native';
import appColor from '../../../../utils/colors';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  productCategoryCard: {
    width: 220,
    height: 200,
    backgroundColor: appColor.themeColor,
    borderRadius: 10,
  },
});
export default styles;

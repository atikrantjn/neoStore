import {StyleSheet, Dimensions} from 'react-native';
import appColor from '../../../../utils/colors';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
  },

  productCategoryCard: {
    // width: '50%',
    // height: '50%',
    // justifyContent: 'space-around',
    backgroundColor: appColor.themeColor,
    borderRadius: 10,
    // marginLeft: 15,
    // marginVertical: 5,
  },
});
export default styles;

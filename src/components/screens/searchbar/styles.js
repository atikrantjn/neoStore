import {StyleSheet, Dimensions} from 'react-native';
import appColors from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default styles;

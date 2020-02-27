import {StyleSheet} from 'react-native';
import appColors from '../../../utils/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: appColors.themeColor,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 25,
  },
  neostoreHeading: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default styles;

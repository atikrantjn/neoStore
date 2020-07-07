import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flexDirection: 'column', marginVertical: 5},

  orderText: {flexDirection: 'row', flex: 1},

  idText: {
    fontSize: 22,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },

  costContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  totalCost: {
    fontSize: 18,
    marginHorizontal: 20,
  },

  orderDateContainer: {flexDirection: 'row', flex: 1},

  orderDateText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
});

export default styles;

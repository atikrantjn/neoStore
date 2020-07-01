import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flexDirection: 'column', marginTop: 10},

  orderText: {flexDirection: 'row', flex: 1},

  idText: {
    fontSize: 25,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },

  costContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  totalCost: {
    fontSize: 20,
    marginHorizontal: 20,
  },

  orderDateContainer: {flexDirection: 'row', flex: 1},

  orderDateText: {
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 5,
  },
});

export default styles;

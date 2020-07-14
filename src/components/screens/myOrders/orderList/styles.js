import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {flex: 1},

  headerContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},

  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemSeperator: {
    height: 1,
    width: '100%',
    backgroundColor: '#B4B4B4',
  },

  emptyListText: {fontSize: 24, textAlign: 'center'},

  renderContainer: {flexDirection: 'column', marginVertical: 5},

  renderOrderText: {flexDirection: 'row', flex: 1},

  renderIdText: {
    fontSize: 22,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },

  renderCostContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },

  renderTotalCost: {
    fontSize: 18,
    marginHorizontal: 20,
  },

  renderOrderDateContainer: {flexDirection: 'row', flex: 1},

  renderOrderDateText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
});

export default styles;

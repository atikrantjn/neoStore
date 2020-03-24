import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export class StoreLocator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 18.579645,
            longitude: 73.738677,
            latitudeDelta: 0,
            longitudeDelta: 0.05,
          }}>
          <Marker
            coordinate={{latitude: 18.579645, longitude: 73.738677}}
            title="neosoft technologies"
            description="here i work"
          />
        </MapView>
      </View>
    );
  }
}

export default StoreLocator;

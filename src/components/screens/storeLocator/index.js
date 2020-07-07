import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {List} from 'react-native-paper';
// import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: '55%',
    width: '100%',
  },
});

export class StoreLocator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      showMap: false,
      latitude: 18.57899549913118,
      longitude: 73.7385973893106,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded,
    });
  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={styles.map}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            description="here i work"
          />
        </MapView>

        <View style={{height: '45%'}}>
          <ScrollView>
            <List.Accordion
              title="Store List"
              titleStyle={{fontSize: 18}}
              left={props => <List.Icon {...props} icon="folder" />}>
              <List.Item
                onPress={() => {
                  this.setState({
                    latitude: 18.57899549913118,
                    longitude: 73.7385973893106,
                  });
                }}
                left={() => <List.Icon icon="map-marker" />}
                title="Neosoft Technologies pune"
                style={{marginLeft: 30}}
                titleStyle={{fontSize: 18}}
              />
              <List.Item
                onPress={() => {
                  this.setState({
                    latitude: 19.018045,
                    longitude: 72.828343,
                  });
                }}
                style={{marginLeft: 30}}
                left={() => <List.Icon icon="map-marker" />}
                title="Neosoft Technologies mumbai"
                titleStyle={{fontSize: 18}}
              />
              <List.Item
                onPress={() => {
                  this.setState({
                    latitude: 19.141132,
                    longitude: 73.008734,
                  });
                }}
                style={{marginLeft: 30}}
                left={() => <List.Icon icon="map-marker" />}
                title="Neosoft Technologies Rabale"
                titleStyle={{fontSize: 18}}
              />
              <List.Item
                onPress={() => {
                  this.setState({
                    latitude: 19.024405,
                    longitude: 72.843736,
                  });
                }}
                style={{marginLeft: 30}}
                left={() => <List.Icon icon="map-marker" />}
                title="Neosoft Technologies Head Office"
                titleStyle={{fontSize: 18}}
              />
            </List.Accordion>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default StoreLocator;

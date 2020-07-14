import React, {Component} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {List} from 'react-native-paper';
// import FaIcon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class StoreLocator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,

      latitude: 18.57899549913118,
      longitude: 73.7385973893106,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,

      markers: [
        {
          title: 'hello',
          coordinates: {
            latitude: 19.018045,
            longitude: 72.828343,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        },
        {
          title: 'hello',
          coordinates: {
            latitude: 19.141132,
            longitude: 73.008734,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        },

        {
          title: 'hello',
          coordinates: {
            latitude: 18.57899549913118,
            longitude: 73.7385973893106,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        },
      ],
    };
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded,
    });
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={styles.map}>
          {this.state.markers.map((marker, key) => (
            <MapView.Marker
              coordinate={marker.coordinates}
              title={marker.title}
            />
          ))}
        </MapView>

        <View style={styles.listContainer}>
          <ScrollView>
            <List.Accordion
              title="Store List"
              titleStyle={styles.listTitleStyle}
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
                style={styles.listItemStyle}
                titleStyle={styles.listTitleStyle}
              />
              <List.Item
                onPress={() => {
                  this.setState({
                    latitude: 19.018045,
                    longitude: 72.828343,
                  });
                }}
                style={styles.listItemStyle}
                left={() => <List.Icon icon="map-marker" />}
                title="Neosoft Technologies mumbai"
                titleStyle={styles.listTitleStyle}
              />
              <List.Item
                onPress={() => {
                  this.setState({
                    latitude: 19.141132,
                    longitude: 73.008734,
                  });
                }}
                style={styles.listItemStyle}
                left={() => <List.Icon icon="map-marker" />}
                title="Neosoft Technologies Rabale"
                titleStyle={styles.listTitleStyle}
              />
              <List.Item
                onPress={() => {
                  this.setState({
                    latitude: 19.024405,
                    longitude: 72.843736,
                  });
                }}
                style={styles.listItemStyle}
                left={() => <List.Icon icon="map-marker" />}
                title="Neosoft Technologies Head Office"
                titleStyle={styles.listTitleStyle}
              />
            </List.Accordion>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default StoreLocator;

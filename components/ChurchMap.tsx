import MapView, { Marker } from 'react-native-maps';

export default function ChurchMap() {
  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      initialRegion={{
        latitude: -22.97872,
        longitude: -47.07052,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      scrollEnabled={false}
    >
      <Marker
        coordinate={{ latitude: -22.97872, longitude: -47.07052 }}
        title="Igreja do Nazareno Swiss Park"
      />
    </MapView>
  );
}

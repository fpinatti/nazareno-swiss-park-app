import React, { Suspense, lazy } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Lazy load the Map component for Android
const MapViewAndroid = lazy(() => 
  import('react-native-maps').then((module) => {
    const MapView = module.default;
    const Marker = module.Marker;
    
    return {
      default: () => (
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
      ),
    };
  })
);

export default function ChurchMap() {
  return (
    <Suspense 
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      }
    >
      <MapViewAndroid />
    </Suspense>
  );
}

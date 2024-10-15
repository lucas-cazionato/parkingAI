import React, { useState } from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles/styles';
import blueMapStyle from './styles/blueMapStyle.json';
import { MaterialIcons } from '@expo/vector-icons';

interface Local {
  id: number;
  latitude: number;
  longitude: number;
  chancesVagasLivres: number;
}

const locais: Local[] = [
  { id: 1, latitude: -25.4574522946628, longitude: -49.23726536143161, chancesVagasLivres: 90 },
  { id: 2, latitude: -25.45743904979222, longitude: -49.235844141446805, chancesVagasLivres: 60 },
  { id: 3, latitude: -25.456846874534687, longitude: -49.23541550885004, chancesVagasLivres: 30 },
];

export default function ViewRoute() {
  const [destino, setDestino] = useState({
    latitude: -25.456861598552365,
    longitude: -49.23582544644812,
  });

  const calcularRaio = (chancesVagasLivres: number): number => {
    return chancesVagasLivres/5;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          customMapStyle={blueMapStyle}
          initialRegion={{
            latitude: destino.latitude,
            longitude: destino.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.001,
          }}
        >
          <Marker
            coordinate={{latitude: destino.latitude, longitude: destino.longitude}}
          >
            <MaterialIcons name="place" size={48} color="red" />
          </Marker>
          {locais.map((local) => (
          <React.Fragment key={local.id}>
            <Circle
              center={{ latitude: local.latitude, longitude: local.longitude }}
              radius={calcularRaio(local.chancesVagasLivres)}
              fillColor={`rgba(0, 255, 0, ${local.chancesVagasLivres / 100})`}
              strokeColor="transparent"
            />
          </React.Fragment>
          ))}
          
        </MapView>
      </View>
    </SafeAreaView>
  );
}
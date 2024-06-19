import React from 'react';
import MapView from 'react-native-maps';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles/styles';
import mapStyle from './styles/mapStyle.json';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: -25.447419990649845,
            longitude: -49.23275795112775,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005,
          }}
        />
        <View style={styles.overlayView}>
          <View style={styles.row}>
            <View style={styles.pinkCircle} />
            <Text style={styles.contentText}>Origem: </Text>
            <TextInput
              style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.greenCircle} />
            <Text style={styles.contentText}>Destino: </Text>
            <TextInput
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.overlayBtn}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.contentText}>Ver Rota</Text>
            </TouchableOpacity>
        </View>       
      </View>
    </SafeAreaView>
  );
}

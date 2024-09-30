import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles/styles';
import blueMapStyle from './styles/blueMapStyle.json';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  viewRoute: undefined;
};

export default function Index() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleViewRoute = () => {
    navigation.navigate('viewRoute');
  };

  const [origem, setOrigem] = useState({
    latitude: -25.426723332443164,
    longitude: -49.26231516153546,
  });

  const [destino, setDestino] = useState({
    latitude: -25.456861598552365,
    longitude: -49.23582544644812,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          customMapStyle={blueMapStyle}
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
              value="Rua Doutor Faivre, 405"
            />
          </View>
          <View style={styles.row}>
            <View style={styles.greenCircle} />
            <Text style={styles.contentText}>Destino: </Text>
            <TextInput
              style={styles.input}
              value="R. Dr. Alcides Vieira Arcoverde, 1225"
            />
          </View>
        </View>
        <View style={styles.overlayBtn}>
            <TouchableOpacity style={styles.button} onPress={handleViewRoute}>
              <Text style={styles.contentText}>Ver Rota</Text>
            </TouchableOpacity>
        </View>       
      </View>
    </SafeAreaView>
  );
}

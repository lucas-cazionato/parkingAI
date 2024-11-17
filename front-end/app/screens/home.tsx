import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Styles } from "@/constants";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
  setTravelTimeInformation,
} from "@/store/travelSlices";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const poligono = [
    {
      latitude: -25.426287,
      longitude: -49.297722,
    },
    {
      latitude: -25.426429,
      longitude: -49.297647,
    },
    {
      latitude: -25.427196,
      longitude: -49.297288,
    },
    {
      latitude: -25.427183,
      longitude: -49.297313,
    },
  ];
  const homePlace = {
    description: "Home",
    geometry: { location: { lat: -25.4230113, lng: -49.2992186 } },
  };
  const workPlace = {
    description: "Work",
    geometry: { location: { lat: -25.441105, lng: -42.276855 } },
  };
  const originRef = useRef<GooglePlacesAutocompleteRef>(null);
  const destinationRef = useRef<GooglePlacesAutocompleteRef>(null);
  const mapRef = useRef<MapView>(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const goToMyLocation = async () => {
    mapRef?.current?.animateCamera({
      center: {
        latitude: userLocation?.coords?.latitude!,
        longitude: userLocation?.coords?.longitude!,
      },
    });
  };

  async function LocalPermissions() {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await Location.getCurrentPositionAsync();
      setUserLocation(currentPosition);
      //console.log("LOCALIZAÇÃO ATUAL:", currentPosition);
    } else {
      console.log(
        "É necessário habilitar a permissão de localização para utilizar este serviço."
      );
    }
  }
  useEffect(() => {
    LocalPermissions();
    goToMyLocation();
  }, []);

  //  useEffect(() => {
  //    Location.watchPositionAsync({
  //      accuracy:Location.LocationAccuracy.Balanced,
  //      timeInterval: 10000,
  //      distanceInterval: 1
  //    }, (response) => {
  //      console.log("Localização atualizada");
  //      setUserLocation(response);
  //      //goToMyLocation();
  //      mapRef.current?.animateCamera({
  //        pitch: 70,
  //        center: response.coords
  //      })
  //    });
  //  }, []);

  useEffect(() => {
    if (!origin?.location || !destination?.location || !mapRef.current) return;

    // Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [origin, destination]);

  const handleConfirm = () => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=metric&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response?.json();
        console.log(data?.rows[0]?.elements[0]);
        dispatch(setTravelTimeInformation(data?.rows[0]?.elements[0]));
        console.log(origin);
      } catch (error) {
        console.log("Error fetching travel time data", error);
      }
    };
    getTravelTime();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        mapType="mutedStandard"
        showsUserLocation={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        scrollDuringRotateOrZoomEnabled={true}
        showsTraffic={true}
        initialRegion={{
          latitude: userLocation?.coords?.latitude! || -25.441105,
          longitude: userLocation?.coords?.longitude! || -49.276855,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {origin &&
          destination && ( // caso tenha origem e destino, carrega rota
            <MapViewDirections
              origin={origin?.description}
              destination={destination?.description}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={4}
              strokeColor="#05204b"
            />
          )}
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin?.location?.lat,
              longitude: origin?.location?.lng,
            }}
            title="Origin"
            description={origin?.description}
            identifier="origin"
          />
        )}
        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination?.location?.lat,
              longitude: destination?.location?.lng,
            }}
            title="Destination"
            description={destination?.description}
            identifier="destination"
          />
        )}
        <Polygon
          coordinates={poligono}
          strokeWidth={1}
          strokeColor="red"
          fillColor="rgba(255,0,0,0.2)"
        />
      </MapView>

      {/* Componentes sobrepostos */}
      <View style={styles.overlay}>
        <View style={{ width: "80%" }}>
          <GooglePlacesAutocomplete
            ref={originRef}
            styles={{
              textInput: {
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            placeholder="Origem:"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            fetchDetails={true}
            minLength={2}
            enablePoweredByContainer={false}
            predefinedPlaces={[homePlace, workPlace]}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details?.geometry?.location,
                  description: data?.description,
                })
              );
            }}
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => originRef.current?.clear()}
          >
            <MaterialIcons name="close" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <View style={{ width: "80%" }}>
          <GooglePlacesAutocomplete
            ref={destinationRef}
            styles={{
              textInput: {
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            placeholder="Destino:"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "pt-br",
              components: "country:br",
            }}
            fetchDetails={true}
            minLength={2}
            enablePoweredByContainer={false}
            predefinedPlaces={[homePlace, workPlace]}
            onPress={(data, details = null) => {
              console.log("DATA\n");
              console.log(data);
              console.log("\n\nDETAILS\n");
              console.log(details);
              console.log("\n\nDATA-DESC\n");
              console.log(data?.description);
              console.log("\n\nDET-GEO-LOC\n");
              console.log(details?.geometry?.location);
              dispatch(
                setDestination({
                  location: details?.geometry?.location,
                  description: data?.description,
                })
              );
            }}
          />
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => destinationRef.current?.clear()}
          >
            <MaterialIcons name="close" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Button
            mode="elevated"
            onPress={handleConfirm}
            style={[
              Styles.button,
              { display: origin && destination ? "flex" : "none" }, // Esconde o botão se origin ou destination estiver vazio
            ]}
            disabled={!origin || !destination}
          >
            Navegar
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: "35%", // Mantém o input no centro
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  clearButton: {
    position: "absolute",
    right: 15, // Posiciona o botão "X" no canto direito do campo
    top: 15,
    zIndex: 1,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const inputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 10,
    flex: 0,
  },
  textInput: {
    fontSize: 10,
    backgroundColor: "#DDDDDD20",
    borderWidth: 1,
    borderColor: "#00000050",
    borderRadius: 50,
  },
});

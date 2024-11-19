import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Styles } from "@/constants";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY, URL_MSPARKING } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectRouteWaypoints,
  setDestination,
  setOrigin,
  setRouteWaypoints,
} from "@/store/travelSlices";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { interpolateColor } from "react-native-reanimated";
import MapViewDirections from "react-native-maps-directions";
import { Appbar } from 'react-native-paper';
import { ParkingSpot } from "@/types";

type RootStackParamList = {
  mapHome: undefined;
  review: undefined;
  mapSimulate: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "mapHome">;

export default function MapHome() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  //  const homePlace = {
  //    description: "Home",
  //    geometry: { location: { lat: -25.4230113, lng: -49.2992186 } },
  //  };
  //  const workPlace = {
  //    description: "Work",
  //    geometry: { location: { lat: -25.441105, lng: -42.276855 } },
  //  };
  const [heading, setHeading] = useState<number | null>(null);
  const [flagRota, setFlagRota] = useState(false);
  const [flagNavegar, setFlagNavegar] = useState(false);
  const destinationRef = useRef<GooglePlacesAutocompleteRef>(null);
  const mapRef = useRef<MapView>(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const routeWaypoints = useSelector(selectRouteWaypoints) || [];
  const dispatch = useDispatch();
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [selectedSpots, setSelectedSpots] = useState<ParkingSpot[]>([]);
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);

  const goToMyLocation = async () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera({
        center: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
      });
    }
  };

  const fitToRoute = async () => {
    if (destination && parkingSpots.length > 0 && mapRef.current) {
      const coordinates = parkingSpots.flatMap((spot) =>
        spot.way_geojson.coordinates[0].map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng,
        }))
      );
      // Inclui o destino nas coordenadas
      coordinates.push({
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      });

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const navigationMode = async () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera({
        center: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
        pitch: 50,
        zoom: 18, // Define um nível de zoom adequado
      });
    }
  };

  useEffect(() => {
    const startWatching = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Atualizações a cada segundo
          distanceInterval: 5, // Atualização a cada 5 metros
        },
        (location) => {
          setUserLocation(location);
          setHeading(location.coords.heading); // Atualiza o curso
        }
      );
      console.log("Localização atualizada");
    };
    startWatching();
  }, []);

  const updateCameraWithRotation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera({
        center: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
        heading: heading || 0, // Use o curso atualizado
        pitch: 50,
        zoom: 18, // Ajuste o zoom conforme necessário
      });
    }
  };

  useEffect(() => {
    if (userLocation && heading !== null) {
      updateCameraWithRotation();
    }
  }, [userLocation, heading]);

  const markerImg = require("../../assets/images/vaga.png");

  async function LocalPermissions() {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await Location.getCurrentPositionAsync();
      setUserLocation(currentPosition);
    } else {
      console.log(
        "É necessário habilitar a permissão de localização para utilizar este serviço."
      );
    }
  }

  useEffect(() => {
    LocalPermissions();
  }, []);

  useEffect(() => {
    if (userLocation) {
      goToMyLocation();
      dispatch(
        setOrigin({
          location: {
            lat: userLocation?.coords?.latitude,
            lng: userLocation?.coords?.longitude,
          },
          description: "Localização Atual",
        })
      );
    }
  }, [userLocation]);

  const fetchParkingSpots = async (destination: {
    location: { lng: number; lat: number };
  }) => {
    try {
      const response = await axios.post<ParkingSpot[]>(
        URL_MSPARKING + "/parking",
        destination
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os dados de estacionamento:", error);
      return [];
    }
  };

  const fetchAndSetParkingSpots = async () => {
    if (!destination || !destination.location) {
      console.error("Destino não definido ou inválido.");
      return;
    }

    const spots = await fetchParkingSpots({
      location: {
        lng: destination.location.lng,
        lat: destination.location.lat,
      },
    });

    setParkingSpots(spots);
  };

  // Buscar vagas quando houver destino
  useEffect(() => {
    if (destination) {
      fetchAndSetParkingSpots();
    }
  }, [destination]);

  // Zoom nas vagas e destino
  useEffect(() => {
    fitToRoute();
  }, [parkingSpots]);

  const navegar = () => {
    setFlagNavegar(true);
    navigationMode();
  };
  const returnRoute = () => {
    setFlagNavegar(false);
    fitToRoute();
  };
  const endNavigation = () => {
    setParkingSpots([]); // Limpa os polígonos
    dispatch(setDestination(null)); // Limpa o marcador
    destinationRef.current?.clear(); // Limpa destinationRef
    setFlagRota(false); // Limpa flag de Rota
    setFlagNavegar(false); // Limpa flag de navegar
    setSelectedSpots([]); // Deve limpar Vagas
    navigation.navigate("review");
  };
  const verRota = () => {
    if (!origin || !destination || selectedSpots.length < 2) {
      console.error("Dados insuficientes para calcular a rota.");
      return;
    }

    //console.log("ORIGIN", origin);
    //console.log("DESTINATION", destination);
    //console.log("WAYPOINTS", routeWaypoints);
    setFlagRota(true);
    dispatch(
      setRouteWaypoints(
        selectedSpots.map((spot) => ({
          latitude: spot.way_geojson.coordinates[0][0][1],
          longitude: spot.way_geojson.coordinates[0][0][0],
        }))
      )
    );

    if (origin && destination && parkingSpots.length > 0 && mapRef.current) {
      const coordinates = parkingSpots.flatMap((spot) =>
        spot.way_geojson.coordinates[0].map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng,
        }))
      );
      // Inclui o destino nas coordenadas
      coordinates.push({
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      });

      // Inclui a origem nas coordenadas
      coordinates.push({
        latitude: origin.location.lat,
        longitude: origin.location.lng,
      });

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const handlePolygonPress = (spot: ParkingSpot) => {
    setSelectedSpots(
      (prev) =>
        prev.some((s) => s.osm_id === spot.osm_id)
          ? prev.filter((s) => s.osm_id !== spot.osm_id) // Remove se já estiver selecionado
          : [...prev, spot] // Adiciona se não estiver
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        toolbarEnabled={false}
        showsUserLocation
        scrollEnabled
        zoomEnabled
        pitchEnabled
        rotateEnabled
        scrollDuringRotateOrZoomEnabled
        showsTraffic
        moveOnMarkerPress
        initialRegion={{
          latitude: userLocation?.coords?.latitude! || -25.423427468369646,
          longitude: userLocation?.coords?.longitude! || -49.25998674411819,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {parkingSpots.map((spot) => {
          const coordinates = spot.way_geojson.coordinates[0].map(
            ([lng, lat]) => ({
              latitude: lat,
              longitude: lng,
            })
          );
          const fillColor = interpolateColor(
            spot.probability_occupancy,
            [0, 0.5, 1],
            ["#ff0000", "#ffff00", "#00ff00"]
          );

          // Calcula o centro do polígono
          const center = coordinates.reduce(
            (acc, coord) => ({
              latitude: acc.latitude + coord.latitude / coordinates.length,
              longitude: acc.longitude + coord.longitude / coordinates.length,
            }),
            { latitude: 0, longitude: 0 }
          );

          return (
            <React.Fragment key={spot.osm_id}>
              <Polygon
                coordinates={coordinates}
                strokeWidth={2}
                strokeColor={
                  selectedSpots.some((s) => s.osm_id === spot.osm_id)
                    ? "blue"
                    : "gray"
                }
                fillColor={fillColor}
                tappable
                onPress={() => handlePolygonPress(spot)}
              />
              <Marker
                coordinate={center}
                title={`Vagas totais: ${spot.capacity}`}
                icon={markerImg}
              ></Marker>
            </React.Fragment>
          );
        })}
        {destination?.location &&
          destination?.location.lat !== undefined &&
          destination?.location.lng !== undefined && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title="Destination"
              description={destination.description}
              identifier="destination"
            />
          )}
        {origin?.location && destination?.location && flagRota && (
          <MapViewDirections
            origin={
              origin.location.lat !== undefined &&
              origin.location.lng !== undefined
                ? {
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                  }
                : undefined
            }
            destination={
              destination.location.lat !== undefined &&
              destination.location.lng !== undefined
                ? {
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                  }
                : undefined
            }
            waypoints={routeWaypoints || undefined}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#05204b"
            mode="DRIVING"
            onError={(errorMessage) => {
              console.error("Erro ao calcular rota:", errorMessage);
            }}
          />
        )}
      </MapView>

      {/* Componentes sobrepostos */}
      {!flagNavegar && (
        <View style={styles.overlay}>
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
                language: "pt-BR",
              }}
              fetchDetails={true}
              minLength={2}
              enablePoweredByContainer={false}
              //predefinedPlaces={[homePlace, workPlace]}
              onPress={(data, details = null) => {
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
              onPress={() => {
                setParkingSpots([]); // Limpa os polígonos
                dispatch(setDestination(null)); // Limpa o marcador
                destinationRef.current?.clear(); // Limpa destinationRef
                setFlagRota(false); // Limpa flag de Rota
                setSelectedSpots([]); // Deve limpar Vagas
              }}
              disabled={!destination}
            >
              <MaterialIcons name="close" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!flagNavegar && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Button
              mode="elevated"
              onPress={verRota}
              style={[
                Styles.button,
                { display: destination ? "flex" : "none" }, // Esconde o botão se destination estiver vazio
              ]}
              disabled={selectedSpots.length < 2}
            >
              Ver Rota
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              mode="elevated"
              onPress={navegar}
              style={[
                Styles.button,
                { display: destination ? "flex" : "none" }, // Esconde o botão se destination estiver vazio
              ]}
              disabled={!flagRota}
            >
              Navegar
            </Button>
          </TouchableOpacity>
        </View>
      )}
      {flagNavegar && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Button
              mode="elevated"
              onPress={returnRoute}
              style={[Styles.button]}
            >
              Voltar
            </Button>
          </TouchableOpacity>

          <TouchableOpacity>
            <Button
              mode="elevated"
              onPress={endNavigation}
              style={[Styles.button]}
            >
              Finalizar
            </Button>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  clearButton: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
    position: "absolute",
    right: 4, // Posiciona o botão "X" no canto direito do campo
    top: 4,
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
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  marker: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  markerText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
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

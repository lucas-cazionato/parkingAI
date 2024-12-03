import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import { TouchableOpacity, View } from "react-native";
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
  selectTravelTimeInformation,
  setDestination,
  setOrigin,
  setRouteWaypoints,
  setTravelTimeInformation,
} from "@/store/travelSlices";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { interpolateColor } from "react-native-reanimated";
import MapViewDirections from "react-native-maps-directions";
import { Text } from "react-native";

type RootStackParamList = {
  mapHome: undefined;
  review: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "mapHome">;

export default function MapHome() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const homePlace = {
    description: "Home",
    geometry: { location: { lat: -25.4230113, lng: -49.2992186 } },
  };
  const workPlace = {
    description: "Work",
    geometry: { location: { lat: -25.441105, lng: -42.276855 } },
  };
  const [heading, setHeading] = useState<number | null>(null);
  const [flagSimular, setFlagSimular] = useState(false);
  const [flagRota, setFlagRota] = useState(false);
  const [flagNavegar, setFlagNavegar] = useState(false);
  const [locationWatcher, setLocationWatcher] =
    useState<Location.LocationSubscription | null>(null);
  const originRef = useRef<GooglePlacesAutocompleteRef>(null);
  const destinationRef = useRef<GooglePlacesAutocompleteRef>(null);
  const mapRef = useRef<MapView>(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelInformation = useSelector(selectTravelTimeInformation);
  const routeWaypoints = useSelector(selectRouteWaypoints) || [];
  const dispatch = useDispatch();
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [selectedSpots, setSelectedSpots] = useState<ParkingSpot[]>([]);
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const markerImg = require("../../assets/images/vaga.png");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');


  // Centraliza na minha localização atual
  const goToMyLocation = async () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera({
        center: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
        pitch: 0,
        zoom: 17,
      });
    }
  };

  // Coloca o zoom e inclinação em modo de navegação
  const navigationMode = async () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera({
        center: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
        pitch: 50,
        zoom: 18,
      });
    }
  };

  // Ajusta o zoom para mostrar as vagas e/ou rota
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

  // Inicia acompanhamento da localização para navegação
  const startWatching = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) return;

    const watcher = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000, // Atualizações a cada 2 segundos
        distanceInterval: 10, // Atualização a cada 10 metros
      },
      (location) => {
        setUserLocation(location);
        setHeading(location.coords.heading); // Atualiza o curso
      }
    );
    setLocationWatcher(watcher);
    console.log("Acompanhamento de localização iniciado");
  };

  // Interrompe acompanhamento da localização para navegação
  const stopWatching = () => {
    if (locationWatcher) {
      locationWatcher.remove();
      setLocationWatcher(null);
      console.log("Acompanhamento de localização interrompido");
    }
  };

  // Atualiza a camera para apontar para a direção de deslocamento
  const updateCameraWithRotation = async () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera({
        center: {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        },
        heading: heading || 0, // Usa o curso atualizado
        pitch: 50,
        zoom: 18,
      });
    }
  };

  // Invoca chamado da API ms_parking e define vagas
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

  // Chamada API ms_parking com retorno das vagas
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

  // Adquirir permissões do usuário para o aplicativo
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

  // Adiciona e remove vagas à rota
  const handlePolygonPress = (spot: ParkingSpot) => {
    setSelectedSpots(
      (prev) =>
        prev.some((s) => s.osm_id === spot.osm_id)
          ? prev.filter((s) => s.osm_id !== spot.osm_id) // Remove se já estiver selecionado
          : [...prev, spot] // Adiciona se não estiver
    );
  };

  // CONSTS ----------------------------------------
  // USE EFFECTS ----------------------------------------

  // Carregamento único das permissões
  useEffect(() => {
    LocalPermissions();
  }, []);

  // Carregamento dependente da localização do usuário
  useEffect(() => {
    if (userLocation && !flagSimular && !flagNavegar) {
      goToMyLocation();
    }
    if (userLocation && !flagSimular) {
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
    if (userLocation && flagNavegar) {
      updateCameraWithRotation();
    }
  }, [userLocation]);

  // Atualiza camera com base na localização e direção do usuário
  useEffect(() => {
    if (userLocation && heading !== null) {
      updateCameraWithRotation();
    }
  }, [userLocation, heading]);

  useEffect(() => {
    if (origin && flagSimular) {
      mapRef.current?.fitToSuppliedMarkers;
    }
  }, [origin]);

  // Buscar vagas quando alterar destino
  useEffect(() => {
    if (destination) {
      fetchAndSetParkingSpots();
    }
  }, [destination]);

  // Zoom nas vagas e destino sempre que mudar parkingSpots
  useEffect(() => {
    fitToRoute();
  }, [parkingSpots]);

  // Ligar/Desligar dados da viagem
  useEffect(() => {
    if (!flagRota) {
      dispatch(setTravelTimeInformation(null));
    }
  }, [flagRota]);

  // Ligar/Desligar acompanhamento de navegação
  useEffect(() => {
    if (flagNavegar) {
      startWatching();
    } else {
      stopWatching();
    }
  }, [flagNavegar]);

  useEffect(() => {
    setParkingSpots([]); // Limpa os polígonos
    dispatch(setOrigin(null)); // Limpa o marcador
    dispatch(setDestination(null)); // Limpa o marcador
    destinationRef.current?.clear(); // Limpa destinationRef
    setFlagRota(false); // Limpa flag de Rota
    setFlagNavegar(false); // Limpa flag de navegar
    setSelectedSpots([]); // Limpa Vagas
    goToMyLocation(); // Ajusta visualização do mapa
  }, [flagSimular]);

  // USE EFFECTS ----------------------------------------

  // BUTTON ACTION ----------------------------------------
  // Visualizar rota
  const verRota = useCallback(() => {
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
  }, [origin, destination, selectedSpots, dispatch]);

  const returnRoute = () => {
    setFlagNavegar(false);
    fitToRoute();
  };

  const startNavigation = useCallback(() => {
    setFlagNavegar(true);
    navigationMode();
  }, [navigation]);

  const endNavigation = () => {
    setParkingSpots([]); // Limpa os polígonos
    dispatch(setDestination(null)); // Limpa o marcador
    destinationRef.current?.clear(); // Limpa destinationRef
    setFlagRota(false); // Limpa flag de Rota
    setFlagNavegar(false); // Limpa flag de navegar
    setSelectedSpots([]); // Limpa Vagas
    goToMyLocation(); // Ajusta visualização do mapa
    navigation.navigate("review");
  };

  const simular = () => {
    setFlagSimular(true);
  };

  const navegar = () => {
    setFlagSimular(false);
  };
  // BUTTON ACTION ----------------------------------------

  // MAP VIEW ----------------------------------------
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
          latitude: userLocation?.coords?.latitude ?? -25.423427468369646,
          longitude: userLocation?.coords?.longitude ?? -49.25998674411819,
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
        {origin?.location &&
          origin?.location.lat !== undefined &&
          origin?.location.lng !== undefined &&
          flagSimular && (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              title="Origin"
              description={origin.description}
              identifier="Origin"
            />
          )}
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
            language="pt-BR"
            mode="DRIVING"
            onReady={(result) => {
              // Arredondando a distância e a duração
              const roundedDistance = result.distance.toFixed(1);
              const roundedDuration = Math.round(result.duration);

              console.log("Distância (km):", roundedDistance);
              console.log("Duração (min):", roundedDuration);

              // Atualiza o Redux com os valores arredondados
              dispatch(
                setTravelTimeInformation({
                  distance: {
                    text: `${roundedDistance} km`,
                    value: roundedDistance,
                  },
                  duration: {
                    text: `${roundedDuration} min`,
                    value: roundedDuration,
                  },
                })
              );
            }}
            onError={(errorMessage) => {
              console.error("Erro ao calcular rota:", errorMessage);
            }}
          />
        )}
      </MapView>

      {/* Componentes sobrepostos */}
      {!flagNavegar && !flagSimular && (
        <View style={Styles.simulateButton}>
          <Button
            mode="elevated"
            onPress={simular}
            style={[Styles.defaultButton]}
          >
            Fazer uma simulação
          </Button>
        </View>
      )}

      {!flagNavegar && flagSimular && (
        <View style={Styles.simulateButton}>
          <Button mode="elevated" onPress={navegar} style={[Styles.button]}>
            Fazer uma navegação
          </Button>
        </View>
      )}

      {!flagNavegar && (
        <View style={Styles.overlay}>
          {/* ORIGEM */}
          {flagSimular && (
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
                  language: "pt-BR",
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
                style={Styles.clearButton}
                onPress={() => {
                  setParkingSpots([]); // Limpa os polígonos
                  dispatch(setOrigin(null)); // Limpa o marcador
                  originRef.current?.clear(); // Limpa destinationRef
                  setFlagRota(false); // Limpa flag de Rota
                  setSelectedSpots([]); // Limpa Vagas
                }}
                disabled={!origin}
              >
                <MaterialIcons name="close" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          )}

          {/* DESTINO */}
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
              predefinedPlaces={[homePlace, workPlace]}
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
              style={Styles.clearButton}
              onPress={() => {
                setParkingSpots([]); // Limpa os polígonos
                dispatch(setDestination(null)); // Limpa o marcador
                destinationRef.current?.clear(); // Limpa destinationRef
                setFlagRota(false); // Limpa flag de Rota
                setSelectedSpots([]); // Limpa Vagas
              }}
              disabled={!destination}
            >
              <MaterialIcons name="close" size={20} color="gray" />
            </TouchableOpacity>
          </View>
          
        </View>
      )}
      
      {travelInformation && (
        <View style={Styles.travelContainer}>
          <View style={Styles.travelBox}>
            <Text style={Styles.travelText}>
              Distância: {travelInformation.distance.text}
            </Text>
            <Text style={Styles.travelText}>
              Tempo: {travelInformation.duration.text}
            </Text>
          </View>
        </View>
      )}

      {destination && !flagNavegar && (
        <View style={Styles.buttonContainer}>
          <Button
            mode="elevated"
            onPress={verRota}
            style={[Styles.defaultButton]}
            disabled={selectedSpots.length < 2}
          >
            Ver Rota
          </Button>
          {!flagSimular && ( // esconde botão de navegação quando é simulação
            <Button
              mode="elevated"
              onPress={startNavigation}
              style={[Styles.button]}
              disabled={!flagRota}
            >
              Navegar
            </Button>
          )}
        </View>
      )}
      {flagNavegar && (
        <View style={Styles.buttonContainer}>
          <TouchableOpacity>
            <Button
              mode="elevated"
              onPress={returnRoute}
              style={[Styles.cancelButton]}
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
// MAP VIEW ----------------------------------------

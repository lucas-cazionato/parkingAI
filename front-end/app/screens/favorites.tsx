import React, { useState, useEffect } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, TextInput, KeyboardAvoidingView  } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Surface, Button} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '../../config';
import { Styles } from '../../constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavorites, deleteFavorite, updateFavorite, addFavorite } from '@/apiService';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


type FavoriteItem = {
  idFavorito: number;
  descricao: string;
  numero: string;
  complemento: string;
  idGoogle: string;
  description: string;
  location: {
    lat: -25.427,
    lng: -49.262
  }
};

type FavoritesProps = {
  navigation: NavigationProp<any>;
};

const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newFavorite, setNewFavorite] = useState<Partial<FavoriteItem>>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const destinationRef = useRef<GooglePlacesAutocompleteRef>(null);


  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);

        const storedUserData = await AsyncStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

        if (parsedUserData && parsedUserData.cpf) {
          setUserData(parsedUserData);
          fetchFavorites(parsedUserData.cpf);
        } else {
          console.error('CPF do usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };
      loadUserData();
    }, []);


 const fetchFavorites = async (cpf: string) => {
    try {
    console.log('CPF do usuário:', cpf);
      const response = await getFavorites(cpf);
      const favoriteData: FavoriteItem[] = response.data as FavoriteItem[];
      if (favoriteData.length === 0) {
            Alert.alert('Nenhum favorito encontrado', 'Você ainda não tem favoritos cadastrados.');
      }
      setFavorites(favoriteData);
    } catch (error) {
      console.error('Erro ao listar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };


const handleEdit = async (idFavorito: number, updatedData: Partial<FavoriteItem>) => {
    try {
      const response = await updateFavorite(idFavorito, updatedData);
      setFavorites((prevFavorites) =>
        prevFavorites.map((item) =>
          item.idFavorito === idFavorito ? { ...item, ...updatedData } : item
        )
      );
      Alert.alert('Sucesso', 'Favorito atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o favorito.');
    }
  };

const handleDelete = (id: number) => {
    Alert.alert(
      'Excluir favorito',
      'Confirma exclusão de endereço favorito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteFavorite(idFavorito);
              setFavorites((prevFavorites) =>
                prevFavorites.filter((item) => item.idFavorito !== idFavorito)
              );
              Alert.alert('Sucesso', 'Favorito excluído com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir favorito:', error);
              Alert.alert('Erro', 'Não foi possível excluir o favorito.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
const handleAddFavorite = async () => {
    try {
      if (!userData || !userData.cpf) {
        Alert.alert('Erro', 'CPF do usuário não encontrado.');
        return;
      }

      const newFavoriteData = {
        ...newFavorite,
        cpfUsuario: userData.cpf,
      };

      const response = await addFavorite(newFavoriteData);

      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
      setNewFavorite({});
      Alert.alert('Sucesso', 'Favorito adicionado com sucesso!');
      setModalOpen(false); // Fecha o modal
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o favorito.');
    }
  };

  if (loading) {
    return (
      <View style={Styles.container}>
        <ActivityIndicator size="large" color="#ec6408" />
      </View>
    );
  }
  return (
 <View style={Styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <Surface style={Styles.surfacefav} elevation={4}>
            <View style={Styles.itemContainer}>
              <View style={Styles.itemContent}>
                <Text style={Styles.itemTitle}>{item.descricao}</Text>
                <Text style={Styles.itemAddress}>{item.description}</Text>
              </View>
              <View style={Styles.itemActions}>
                <TouchableOpacity onPress={() => handleEdit(item.idFavorito,em.idGoogle, item.descricao, item.description, item.location)}>
                  <Icon name="edit" size={24} color="#ec6408" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.idFavorito)}>
                  <Icon name="delete" size={24} color="#ec6408" />
                </TouchableOpacity>
              </View>
            </View>
          </Surface>
        )}
        keyExtractor={(item) => item.idFavorito.toString()}
      />
      <TouchableOpacity style={Styles.floatingButton} onPress={() => setModalOpen(true)}>
             <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
     <Modal visible={isModalOpen} animationType="slide" transparent={true}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
             <View style={Styles.modalOverlay}>
               <View style={Styles.modalContent}>
                 <Text style={Styles.modalTitle}>Adicionar Novo Favorito</Text>
                  <TextInput
                   style={Styles.textInputFav}
                   placeholder="Descrição"
                   mode="outlined"
                   value={newFavorite.descricao || ''}
                   onChangeText={(text) =>
                     setNewFavorite({ ...newFavorite, descricao: text })
                   }
                     />
                 <GooglePlacesAutocomplete
                   placeholder="Pesquisar endereço"
                   ref={destinationRef}
                   nearbyPlacesAPI="GooglePlacesSearch"
                   debounce={400}
                   query={{
                     key: GOOGLE_MAPS_API_KEY,
                     language: 'pt-BR',
                   }}
                   fetchDetails={true}
                   minLength={3}
                   enablePoweredByContainer={false}
                   styles={{ textInput: Styles.textInputFav }}
                   onPress={(data, details = null) => {
                   dispatch(
                     setNewFavorite({
                       ...newFavorite,
                       idGoogle: details?.place_id,
                       description: data?.description,
                       location: details?.geometry?.location,
                     })
                   )
                   }}

                 />

                 <View style={Styles.buttonContainerFav}>
                   <Button mode="contained" onPress={handleAddFavorite} style={Styles.defaultButton}>
                     Salvar
                   </Button>
                   <Button mode="contained" onPress={() => setModalOpen(false)} style={Styles.cancelButton}>
                     Cancelar
                   </Button>
                 </View>
               </View>
             </View>
            </ScrollView>
           </KeyboardAvoidingView>
          </Modal>
         </View>
       );
     };

export default Favorites;

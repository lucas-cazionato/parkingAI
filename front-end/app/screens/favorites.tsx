import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Styles } from '../../constants/Styles';
import { Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FavoriteItem = {
  id: number;
  title: string;
  address: string;
};

type FavoritesProps = {
  navigation: NavigationProp<any>;
};

const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  const mockData: FavoriteItem[] = [
    { id: 1, title: 'Casa', address: 'Rua das Flores, 123' },
    { id: 2, title: 'Trabalho', address: 'Avenida Sete de Setembro, 3165' },
    { id: 3, title: 'SEPT', address: 'Rua Doutor Alcides Vieira Arcoverde, 1225' },
    { id: 5, title: 'Shopping Mueller', address: 'Av. Cândido de Abreu, 127' },
    { id: 4, title: 'Escola', address: 'Rua Professor Brandão, 789' },
  ];

  const handleEdit = (id: number) => {
    // Função para editar o item com o id específico
    console.log(`Edit item with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Excluir favorito',
      'Confirma exclusão de endereço favorito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              //lógica para excluir favorito

            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a conta.');
            } finally {
              //setIsLoading(false);
            }
          }
        },
      ]
    );
  };

  return (
    <ScrollView>
      <View style={Styles.containerfav}>
        <Surface style={Styles.surface} elevation={4}>
          <Icon name="favorite" size={50} color="#ec6408" />
          <Text style={Styles.header}>Favoritos</Text>
          <Text style={Styles.subText}>Gerencie seus endereços favoritos</Text>
        </Surface>

        <FlatList<FavoriteItem>
          data={mockData}
          renderItem={({ item }) => (
            <View style={Styles.itemfav}>
              <Text style={Styles.titlefav}>{item.title}</Text>
              <Text style={Styles.addressfav}>{item.address}</Text>
              <View style={Styles.iconsContainer}>
                <TouchableOpacity onPress={() => handleEdit(item.id)} style={Styles.iconButton}>
                  <Icon name="edit" size={30} color="#ec6408" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={Styles.iconButton}>
                  <Icon name="delete" size={30} color="#ec6408" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>

  );
};

export default Favorites;

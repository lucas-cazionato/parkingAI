import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type FavoritesProps = {
  navigation: NavigationProp<any>;
};

const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favoritos</Text>
      {/* Adicione aqui a lógica para exibir a lista de favoritos */}
      <FlatList
        data={[]} // Substitua por sua lista de favoritos
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Favorites;
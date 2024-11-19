import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Styles } from '../../constants/Styles';
import { MaterialIcons } from '@expo/vector-icons';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          {/* Adicionar Logo */}
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.headerText}>Parking AI</Text>
      </View>


      <View style={styles.menu}>
        {/* DrawerItemList não suporta labelStyle diretamente */}
        <DrawerItemList {...props} />
        <DrawerItem
          label="Ajuda"
          icon={({ color }) => <MaterialIcons name="help-outline" size={24} color={color} />}
          onPress={() => props.navigation.navigate('Ajuda')}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            // Lógica para logout
            console.log('Usuário deslogado');
            props.navigation.navigate('Login'); // Redirecionar para a tela de login
          }}>
          <MaterialIcons name="logout" size={24} color="#ec6408" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#05204b',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
    paddingVertical: 10,
  },
  drawerLabel: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: -15,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,

  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEDED',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  logoutText: {
    fontSize: 16,
    color: '#ec6408',
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
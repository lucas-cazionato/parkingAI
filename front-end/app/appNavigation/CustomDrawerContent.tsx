import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { logout } from '@/apiService';
import Colors from '@/constants/Colors';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
  //header
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/images/PAI.png')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.headerText}>Parking AI</Text>
      </View>
 {/*Body*/}
    <View style={styles.menu}>
        <DrawerItemList {...props} labelStyle={styles.drawerLabel} />
    </View>
{/*Footer*/}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            try {
              await logout(props.navigation); // Chama a função de logout
              Alert.alert('Usuário deslogado com sucesso!', '\nObrigado por usar o Parking AI.'); // Exibe a mensagem de sucesso
            } catch (error) {
              Alert.alert('Erro', 'Houve um problema ao deslogar. Tente novamente.');
              console.error('Erro ao realizar logout:', error);
            }
          }}
        >
          <MaterialIcons name="logout" size={28} color="#ec6408" />
          <Text style={styles.logoutText}>Sair</Text>
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
    width: 90,
    height: 90,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontSize: 28,
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
    borderTopColor: '#ffffff',

  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  logoutText: {
    fontSize: 20,
    color: '#ec6408',
    marginLeft: 10,
  },
  drawerItemLabel: {
      color: '#ffffff',
      fontSize: 20,
    },
});

export default CustomDrawerContent;
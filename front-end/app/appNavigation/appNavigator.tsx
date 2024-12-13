import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import Login from '../(auth)/login';
import Register from '../(auth)/register';
import ForgotPassword from '../(auth)/forgotPassword';
import UserAccount from '../screens/userAccount';
import ChangePassword from '../screens/changePassword';
import MapHome from '../screens/mapHome';
import Review from '../screens/review';
import Favorites from '../screens/favorites';
import Help from '../screens/help';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawerContent from './CustomDrawerContent';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: '#05204b',
    height: 110,
},
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold' as 'bold',
    fontSize: 23
  },
};

function AuthStackNavigator() {
  return (
 <Stack.Navigator initialRouteName="Login" screenOptions={headerOptions}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
              <MaterialIcons name="help-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
              <MaterialIcons name="help-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={MapHome} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


function DrawerNavigator() {
  return (
        <Drawer.Navigator
          initialRouteName="Mapa"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerLabelStyle: {
              color: '#ffffff',
              fontSize: 23,
            },
             ...headerOptions,
          }}
        >
          <Drawer.Screen
            name="Mapa"
            component={MapHome}
            options={{
              drawerIcon: ({ color, size }) => (
                <Feather name="globe" size={26} color={'#ffffff'} />
              ),
            }}
          />
            <Drawer.Screen
                name="Conta"
                component={UserAccount}
                options={{
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-circle-outline" size={28} color={'#ffffff'}/>
                ),
                }}/>
          <Drawer.Screen
            name="Avaliação"
            component={Review}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="rate-review" size={20} color={'#ffffff'} />
              ),
            }}
          />
          <Drawer.Screen
            name="Favoritos"
            component={Favorites}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cards-heart-outline" size={28} color={'#ffffff'} />
              ),
            }}
          />
          <Drawer.Screen
              name="Ajuda"
              component={Help}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialIcons name="help-outline" size={30} color={'#ffffff'} />
                ),
              }}
          />
      </Drawer.Navigator>
    );
}

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se o usuário está autenticado ao carregar o app
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token); // Se houver token, o usuário está autenticado
    };

    checkAuthentication(); // Verificar a autenticação ao carregar o app
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Main" : "Auth"}
        screenOptions={{headerStyle: {
                        backgroundColor: '#05204b',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                          fontWeight: 'bold' as 'bold',
                          fontSize: 20,
                        },
                        }}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Alterar Senha" component={ChangePassword} options={{ headerShown: true }} />
        <Stack.Screen name="Avaliação" component={Review} options={{ headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

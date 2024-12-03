import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from '../../constants/Styles';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: '#05204b',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold' as 'bold',
  },
};

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={MapHome} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Map"
      drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: { backgroundColor: '#05204b' },
        drawerActiveTintColor: '#FFF', // Cor do texto do item ativo
        drawerInactiveTintColor: '#FFF', // Cor do texto dos itens inativos
      }}
    >
      <Drawer.Screen name="Map" component={MapHome} options={headerOptions} />
      <Drawer.Screen name="review" component={Review} options={headerOptions} />
      <Drawer.Screen name="UserAccount" component={UserAccount} options={headerOptions} />
      <Drawer.Screen name="changePassword" component={ChangePassword} options={headerOptions} />
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
      <Stack.Navigator initialRouteName={isAuthenticated ? "Main" : "Auth"}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

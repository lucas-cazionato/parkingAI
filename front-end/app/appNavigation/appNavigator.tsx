import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../(auth)/login';
import Register from '../(auth)/register';
import ForgotPassword from '../(auth)/forgotPassword';
import UserAccount from '../screens/userAccount';
import MapHome from '../screens/mapHome';
import MapSimulate from '../screens/mapSimulate';
import Review from '../screens/review';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="mapHome">
      <Drawer.Screen name="mapHome" component={MapHome} />
      <Drawer.Screen name="mapSimulate" component={MapSimulate} />
      <Drawer.Screen name="review" component={Review} />
      <Drawer.Screen name="UserAccount" component={UserAccount} />
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

    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
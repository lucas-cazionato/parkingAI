import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../(auth)/login';
import Register from '../(auth)/register';
import ForgotPassword from '../(auth)/forgotPassword';
import MapHome from '../screens/mapHome';
import MapSimulate from '../screens/mapSimulate';
import Review from '../screens/review';
import UserAccount from '../(auth)/userAccount';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="UserAccount" component={UserAccount} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
    return (
      <Drawer.Navigator initialRouteName="mapHome">
        <Drawer.Screen name="mapHome" component={MapHome} />
        <Drawer.Screen name="mapSimulate" component={MapSimulate} />
        <Drawer.Screen name="review" component={Review} />
      </Drawer.Navigator>
    );
  }

const AppNavigator = () => {
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
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Login from '../(auth)/login';
import Register from '../(auth)/register';
import ForgotPassword from '../(auth)/forgotPassword';
import UserAccount from '../screens/userAccount';
import MapHome from '../screens/mapHome';
import MapSimulate from '../screens/mapSimulate';
import Review from '../screens/review';
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
    fontWeight: 'bold',
  },
};

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
      <Drawer.Navigator initialRouteName="mapHome"
        drawerContent={( props) => <CustomDrawerContent {...props} />}
        drawerStyle={Styles.drawerContent}
      >
        <Drawer.Screen name="mapHome" component={MapHome} options={headerOptions}/>
        <Drawer.Screen name="mapSimulate" component={MapSimulate} options={headerOptions}/>
        <Drawer.Screen name="review" component={Review} options={headerOptions}/>
      <Drawer.Screen name="UserAccount" component={UserAccount} options={headerOptions}/>
      </Drawer.Navigator>
    );
  }

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Auth" component={AuthStackNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
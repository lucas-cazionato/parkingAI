import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from '../../constants/Styles';
import { login } from '../../apiService';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: undefined;
};

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [PasswordVisible, setPasswordVisible] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('savedEmail');
        const savedPassword = await AsyncStorage.getItem('savedPassword');
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');

        if (savedEmail && savedPassword && savedRememberMe === 'true') {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Erro ao carregar credenciais salvas:', error);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      if (userData.token) {
        setMessage(`Bem-vindo, ${userData.login}`);
        navigation.navigate('Main');

        if (rememberMe) {
          await AsyncStorage.setItem('savedEmail', email);
          await AsyncStorage.setItem('savedPassword', password);
          await AsyncStorage.setItem('rememberMe', 'true');
        } else {
          await AsyncStorage.removeItem('savedEmail');
          await AsyncStorage.removeItem('savedPassword');
          await AsyncStorage.setItem('rememberMe', 'false');
        }
      } else {
        setMessage('Erro ao autenticar. Tente novamente.');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);

      let errorMessage = 'Erro ao autenticar. Tente novamente.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      setMessage(errorMessage);
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Image
          source={require('../../assets/images/ParkingAi.png')}
          style={Styles.logo}
        />
      </View>

      <TextInput
        label="Email"
        value={email}
        activeUnderlineColor="#ec6408"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={Styles.input}
      />

      <TextInput
        label="Senha"
        value={password}
        autoCapitalize="none"
        activeUnderlineColor="#ec6408"
        onChangeText={setPassword}
        secureTextEntry={!PasswordVisible}
        right={<TextInput.Icon icon={PasswordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!PasswordVisible)} />}
        style={Styles.input}
      />

      <View style={Styles.rowContainer}>
        <View style={Styles.checkboxContainer}>
          <Checkbox
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
            color="#ffffff"
          />
          <Text style={Styles.highlightText}>Lembrar de mim</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={Styles.forgetText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={handleLogin} style={Styles.defaultButton}>
        Entrar
      </Button>

      {message ? <Text style={Styles.messageText}>{message}</Text> : null}

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={Styles.registerContainer}>
        <Text style={Styles.registerText}>
          Não tem uma conta? <Text style={Styles.highlightText}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

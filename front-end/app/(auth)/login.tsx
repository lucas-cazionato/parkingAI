import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
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
  const [message, setMessage] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      console.log('login_TOKEN:', userData.token);
      console.log('login_CPF:', userData.cpf);
      console.log('login_DADOS USUÁRIO:', userData);
      if (userData.token) {
        setMessage(`Bem-vindo, ${userData.login}`);
        navigation.navigate('Main');
      } else {
        setMessage('Erro ao autenticar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setMessage('Erro no login. Verifique suas credenciais.');
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
        activeUnderlineColor="#ec6408"
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.input}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={Styles.forgetText}>Esqueci minha senha</Text>
      </TouchableOpacity>

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
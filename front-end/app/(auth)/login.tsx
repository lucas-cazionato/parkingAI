import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Styles } from '../../constants/Styles';
import Register from './register';
import { login } from '../../apiService';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState('');
  
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      setMessage(`Bem-vindo, ${userData.login}`);
    } catch (error) {
      setMessage('Erro no login. Verifique suas credenciais.');
    }
  };

  const onBack = () => {
    setIsRegistering(false);
  };

  if (isRegistering) {
    return <Register navigation={navigation} onBack={onBack} />;
  }


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
        activeUnderlineColor='#ec6408'
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={Styles.input}
      />

      <TextInput
        label="Senha"
        value={password}
        activeUnderlineColor='#ec6408'
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.input}
      />


      <TouchableOpacity onPress={() => setForgotPassword(true)}>
      <Text style={Styles.forgetText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={Styles.defaultButton}
      >
        Entrar
      </Button>

      {message ? <Text style={Styles.messageText}>{message}</Text> : null}

      <TouchableOpacity onPress={() => setIsRegistering(true)} style={Styles.registerContainer}>
        <Text style={Styles.registerText}>
          Não tem uma conta? <Text style={Styles.highlightText}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}



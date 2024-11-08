import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Styles } from '../../constants/Styles';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Lógica para recuperação de senha
    Alert.alert('Recuperação de Senha', 'Instruções de recuperação de senha enviadas para o seu email.');
    navigation.goBack(); // Voltar para a tela de login
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.header}>Recuperar Senha</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={Styles.input}
      />
      <Button mode="contained" onPress={handleForgotPassword} style={Styles.defaultButton}>
        Enviar Instruções
      </Button>
    </View>
  );
};

export default ForgotPassword;
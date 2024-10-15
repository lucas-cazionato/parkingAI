
/*
//import { register } from '../api/login';
//import { useForm, Controller } from 'react-hook-form';
//import * as yup from 'yup';
//import { yupResolver } from '@hookform/resolvers/yup';
//import { TextInputMask } from 'react-native-masked-text';
//import { Link, useRouter } from 'expo-router';

import { TextInput, Image, Pressable, View, Text, StyleSheet, Alert} from 'react-native';
import { IconButton, Appbar, IconButtonProps, Button  } from 'react-native-paper';
import { Styles, Images, Colors, Icons } from '@/constants';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { User } from '../models/user';

import React, { useState } from 'react';

export default function Registern() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    Alert.alert('Sucesso', 'Registro efetuado com sucesso!');
    // Lógica de registro aqui
  };

  const handleCancel = () => {
    navigation.navigate('Login');
  };

  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
}
  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundMain }}>
    <Appbar
      title="Criar sua conta"
      style={Styles.appBar}
      leading={props => (
        <IconButton
          icon={(iconProps) => <Icons name="arrow-left" {...iconProps} />}
          //onPress={()=> router.back()}
          {...props}
        />
      )}
    />
    <Image source={Images.parkAIlogo} style={Styles.image} />
        <Text style={Styles.title}>Registro</Text>
        <Input
          variant="rounded"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="E-mail" />
        </Input>
        <TextInput
          style={Styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={Styles.input}
          placeholder="Nome Completo"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={Styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={Styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TextInput
          style={Styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={birthDate}
          onChangeText={setBirthDate}
          keyboardType="numeric"
        />

        <TextInput
          style={Styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <HStack>
        <View style={Styles.cancelButton}>
          <Button title="Cancelar" 
            style={Styles.}
            onPress={handleRegister} />
        </View>
        <View style={Styles.defaultButton}>  
          <Button title="Cadastrar" 
            onPress={handleRegister} />
        </View>
        </HStack>
  );
}
  </View>      
  );
}

*/
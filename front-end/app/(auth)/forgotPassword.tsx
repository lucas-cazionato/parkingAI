import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Controller, useForm } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import { Styles } from '../../constants/Styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  ForgotPassword: undefined;
  Login: undefined;
};

type ForgotPasswordScreenNavigationProp = NavigationProp<RootStackParamList, 'ForgotPassword'>;


const ForgotPassword: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<{ email: string }>();
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const handleForgotPassword = () => {
    /*
    try {
      
      await api(data.email);
      Alert.alert('Recuperação de Senha', 'Instruções de recuperação de senha enviadas para o seu email.');
      navigation.navigate('Login'); // Voltar para a tela de login
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message || 'Ocorreu um erro ao enviar o email de recuperação de senha.');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro desconhecido ao enviar o email de recuperação de senha.');
      }
    }
      */
  };

    return (
      <View style={Styles.container}>
        <View style={Styles.inputContainer}>
          <Surface style={Styles.surface} elevation={4}>
            <Icon name="question-mark" size={100} color="#ec6408" />
            <Text style={Styles.header}>Recuperar Senha</Text>
            <Text style={Styles.subText}>Preencha o campo com seu e-mail de cadastro</Text>
          </Surface>
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  label="Email"
                  value={value || ''}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  activeUnderlineColor='#ec6408'
                  style={Styles.input}
                  error={!!errors.email}
                />
                <HelperText type="error" visible={!!errors.email} style={Styles.helperText}>
                  {errors.email?.message}
                </HelperText>
              </>
            )}
          />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button mode="contained" onPress={() => navigation.navigate('Login')} style={Styles.cancelButton}>
          Voltar para Login
        </Button>
        <Button mode="contained" onPress={handleForgotPassword} style={Styles.defaultButton}>
          Enviar Instruções
        </Button>
        </View>
      </View>
      </View>
    );
  };

export default ForgotPassword;
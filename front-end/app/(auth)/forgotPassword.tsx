import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import { Styles } from '../../constants/Styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { newPassword } from '@/apiService';

type RootStackParamList = {
  ForgotPassword: undefined;
  Login: undefined;
};

type ForgotPasswordScreenNavigationProp = NavigationProp<RootStackParamList, 'ForgotPassword'>;


const ForgotPassword: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<{ login: string }>();
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const onSubmit: SubmitHandler<{ login: string }> = async (data) => {
    try {

      const response = await newPassword(data);

      if (response.status === 204) {
      console.log('Email enviado com sucesso:', data);
      Alert.alert('Recuperação de Senha', 'Instruções de recuperação de senha foram enviadas para o seu email.');
      navigation.navigate('Login');

      } else {
              console.error('Erro :', response.statusText);
              Alert.alert('Erro', 'Erro ao solicitar senha.');
            }

    } catch (error: any) {
      console.error('Erro ao enviar email de recuperação de senha:', error);
      let errorMessage = 'Ocorreu um erro ao enviar o email de recuperação de senha.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      Alert.alert('Erro', errorMessage);
    }
  };

    return (
      <View style={Styles.container}>
        <View style={Styles.inputContainer}>
          <Surface style={Styles.surface} elevation={4}>
            <Icon name="question-mark" size={80} color="#ec6408" />
            <Text style={Styles.header}>Recuperar Senha</Text>
            <Text style={Styles.subText}>Preencha o campo com seu e-mail de cadastro</Text>
          </Surface>
          <Controller
            control={control}
            name="login"
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
                  error={!!errors.login}
                />
                <HelperText type="error" visible={!!errors.login} style={Styles.helperText}>
                  {errors.login?.message}
                </HelperText>
              </>
            )}
          />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button mode="contained" onPress={() => navigation.navigate('Login')} style={Styles.cancelButton}>
          Voltar para Login
        </Button>
        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={Styles.defaultButton}>
          Enviar Instruções
        </Button>
        </View>
      </View>
      </View>
    );
  };

export default ForgotPassword;
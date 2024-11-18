import React, { useRef, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button, HelperText, Surface } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigation, NavigationProp, RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { Styles } from '../../constants/Styles';
import { User } from '../models/User';
import { register } from '../../apiService';
import { ScrollView } from 'react-native-gesture-handler';

interface FormData extends Omit<User, 'confirmPassword'> {
  confirmPassword: string;
}

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type RegisterScreenNavigationProp = NavigationProp<RootStackParamList, 'Register'>;


const Register: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<FormData>();
  const [user, setUser] = useState<Partial<User>>({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const phoneInputRef = useRef<TextInputMask>(null);
  const dateInputRef = useRef<TextInputMask>(null);
  const cpfInputRef = useRef<TextInputMask>(null);

  const validatePasswords = () => {
    if (user.senha !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'As senhas não coincidem.',
      });
      return false;
    } else {
      clearErrors('confirmPassword');
      return true;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('handleRegister called');
    console.log('Form data:', data);
    console.log('Confirm Password:', confirmPassword);

    if (!validatePasswords()) {
      return;
    }
    
    try {
      const responseData = await register(user); // Chame a função register
  
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message || 'Ocorreu um erro ao realizar o cadastro.');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro desconhecido ao realizar o cadastro.');
      }
    }
  };

  return (
    <View style={Styles.container}>
      <ScrollView>
      <View style={Styles.inputContainer}>
        <Surface style={Styles.surface} elevation={4}>
          <Icon name="person-add" size={100} color="#ec6408" />
          <Text style={Styles.header}>Crie sua conta</Text>
          <Text style={Styles.subText}>Preencha os campos com suas informações</Text>
        </Surface>

        <Controller
          control={control}
          name="nome"
          rules={{ required: 'Nome é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Nome Completo"
                value={value || ''}
                onBlur={onBlur}
                onChangeText={(nome) => {
                  onChange(nome);
                  setUser({ ...user, nome });
                }}
                activeUnderlineColor='#ec6408'
                style={Styles.input}
                error={!!errors.nome}
              />
              <HelperText type="error" visible={!!errors.nome} style={Styles.helperText}>
                {errors.nome?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="dataDeNascimento"
          rules={{ required: 'Data de nascimento é obrigatória' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Data de Nascimento"
                value={value || ''}
                onBlur={onBlur}
                onChangeText={(dataDeNascimento) => {
                  onChange(dataDeNascimento);
                  setUser({ ...user, dataDeNascimento });
                }}
                activeUnderlineColor='#ec6408'
                style={Styles.input}
                error={!!errors.dataDeNascimento}
                render={props => (
                  <TextInputMask
                    {...props}
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY'
                    }}
                    value={value}
                    onChangeText={onChange}
                    ref={dateInputRef}
                  />
                )}
              />
              <HelperText type="error" visible={!!errors.dataDeNascimento} style={Styles.helperText}>
                {errors.dataDeNascimento?.message}
              </HelperText>
            </>
          )}
        />


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
                onChangeText={(email) => {
                  onChange(email);
                  setUser({ ...user, email });
                }}
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

        <Controller
          control={control}
          name="cpf"
          rules={{ required: 'CPF é obrigatório', pattern: { value: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, message: 'CPF inválido' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="CPF"
                value={value || ''}
                onBlur={onBlur}
                onChangeText={(cpf) => {
                  onChange(cpf);
                  setUser({ ...user, cpf });
                }}
                keyboardType="numeric"
                activeUnderlineColor='#ec6408'
                style={Styles.input}
                error={!!errors.cpf}
                render={props => (
                  <TextInputMask
                    {...props}
                    type={'cpf'}
                    value={value}
                    onChangeText={onChange}
                    ref={cpfInputRef}
                  />
                )}
              />
              <HelperText type="error" visible={!!errors.cpf} style={Styles.helperText}>
                {errors.cpf?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="telefone"
          rules={{ required: 'Telefone é obrigatório', pattern: { value: /^\(\d{2}\) \d{4,5}\-\d{4}$/, message: 'Telefone inválido' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Telefone"
                value={value || ''}
                onBlur={onBlur}
                onChangeText={(telefone) => {
                  onChange(telefone);
                  setUser({ ...user, telefone });
                }}
                keyboardType="numeric"
                activeUnderlineColor='#ec6408'
                style={Styles.input}
                error={!!errors.telefone}
                render={props => (
                  <TextInputMask
                    {...props}
                    type={'cel-phone'}
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) '
                    }}
                    value={value}
                    onChangeText={onChange}
                    ref={phoneInputRef}
                  />
                )}
              />
              <HelperText type="error" visible={!!errors.telefone} style={Styles.helperText}>
                {errors.telefone?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="senha"
          rules={{ required: 'Senha é obrigatória' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Senha"
                value={value || ''}
                onBlur={onBlur}
                onChangeText={(senha) => {
                  onChange(senha);
                  setUser({ ...user, senha });
                }}
                activeUnderlineColor='#ec6408'
                secureTextEntry={!passwordVisible}
                right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                style={Styles.input}
                error={!!errors.senha}
              />
              <HelperText type="error" visible={!!errors.senha} style={Styles.helperText}>
                {errors.senha?.message}
              </HelperText>
            </>
          )}
        />

        <TextInput
          label="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          activeUnderlineColor='#ec6408'
          secureTextEntry
          right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />}
          style={Styles.input}
          error={!!errors.confirmPassword}
        />
        <HelperText type="error" visible={!!errors.confirmPassword} style={Styles.helperText}>
          {errors.confirmPassword?.message}
        </HelperText>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button 
        mode="contained" 
        onPress={() => navigation.navigate('Login')} 
        style={Styles.cancelButton}>
          Voltar
        </Button>

          <Button
            mode='contained'
            onPress={handleSubmit(onSubmit)}
            style={Styles.defaultButton}>
            <Text>Cadastrar</Text>
          </Button>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default Register;
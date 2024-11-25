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

    // Formata os dados conforme backend
    const formattedUser = {
      nome: data.nome,
      dataNascimento: formatDate(data.dataNascimento),
      login: data.login, // Email
      cpf: formatCPF(data.cpf),
      telefone: data.telefone,
      senha: data.senha,
    };

    try {
      const responseData = await register(formattedUser);

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

  // Formata a data no padrão ISO (yyyy-MM-dd)
  const formatDate = (date: string) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/[.\-]/g, '');
  };


  return (
    <View style={Styles.container}>
      <ScrollView>
        <View style={Styles.inputContainer}>
          <Surface style={Styles.surface} elevation={4}>
            <Icon name="person-add" size={50} color="#ec6408" />
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
            name="dataNascimento"
            rules={{
              required: 'Data de nascimento é obrigatória',
              validate: (value) => {
                const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
                if (!isValidDate) return 'Data inválida. Use o formato DD/MM/YYYY.';
                const [day, month, year] = value.split('/').map(Number);
                const date = new Date(year, month - 1, day);
                if (
                  date.getFullYear() !== year ||
                  date.getMonth() !== month - 1 ||
                  date.getDate() !== day
                ) {
                  return 'Data inválida.';
                }
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  label="Data de Nascimento"
                  value={value || ''}
                  onBlur={onBlur}
                  onChangeText={(dataNascimento) => {
                    onChange(dataNascimento);
                    setUser({ ...user, dataNascimento });
                  }}
                  activeUnderlineColor='#ec6408'
                  style={Styles.input}
                  error={!!errors.dataNascimento}
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
                <HelperText type="error" visible={!!errors.dataNascimento} style={Styles.helperText}>
                  {errors.dataNascimento?.message}
                </HelperText>
              </>
            )}
          />


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
                  onChangeText={(login) => {
                    onChange(login);
                    setUser({ ...user, login });
                  }}
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
            secureTextEntry={!confirmPasswordVisible}
            right={<TextInput.Icon icon={confirmPasswordVisible ? "eye-off" : "eye"} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />}
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
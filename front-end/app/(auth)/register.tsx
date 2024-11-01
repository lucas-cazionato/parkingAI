import React, { useRef, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useForm, Controller } from 'react-hook-form';
import { Styles } from '../../constants/Styles';
import { User } from '../models/User';


const Register = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<User>({
    defaultValues: {
      email: '',
      cpf: '',
      name: '',
      phone: '',
      password: '',
    },
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const phoneInputRef = useRef<TextInputMask>(null);

  const onSubmit = async (data: User) => {
    console.log('handleRegister called');
    console.log('Form data:', data);
    console.log('Confirm Password:', confirmPassword);

    if (data.password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('login'); // Navegar para a tela de login após o registro bem-sucedido
      } else {
        Alert.alert('Erro', responseData.message || 'Ocorreu um erro ao realizar o cadastro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao conectar com o servidor.');
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.inputContainer}>
        <View style={Styles.headerContainer}>
          <Icon name="person-add" size={100} color="#ec6408" />
          <Text style={Styles.header}>Crie sua conta</Text>
          <Text style={Styles.subText}>Preencha os campos com suas informações</Text>
        </View>

        <Controller
          control={control}
          name="name"
          rules={{ required: 'Nome é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Nome Completo"
                value={value}
                onBlur={onBlur}
                onChangeText={(name) => {
                  onChange(name);
                  setUser({ ...user, name });
                }}
                activeUnderlineColor='#ec6408'
                style={Styles.input}
                error={!!errors.name}
              />
              <HelperText type="error" visible={!!errors.name} style={Styles.helperText}>
                {errors.name?.message}
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
                value={value}
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
                value={value}
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
          name="phone"
          rules={{ required: 'Telefone é obrigatório', pattern: { value: /^\(\d{2}\) \d{4,5}\-\d{4}$/, message: 'Telefone inválido' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Telefone"
                value={value}
                onBlur={onBlur}
                onChangeText={(phone) => {
                  onChange(phone);
                  setUser({ ...user, phone });
                }}
                keyboardType="numeric"
                activeUnderlineColor='#ec6408'
                style={Styles.input}
                error={!!errors.phone}
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
              <HelperText type="error" visible={!!errors.phone} style={Styles.helperText}>
                {errors.phone?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Senha é obrigatória' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Senha"
                value={value}
                onBlur={onBlur}
                onChangeText={(password) => {
                  onChange(password);
                  setUser({ ...user, password });
                }}
                activeUnderlineColor='#ec6408'
                secureTextEntry={!passwordVisible}
                right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                style={Styles.input}
                error={!!errors.password}
              />
              <HelperText type="error" visible={!!errors.password} style={Styles.helperText}>
                {errors.password?.message}
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
          right={<TextInput.Icon icon="eye" />}
          style={Styles.input}
          error={!!errors.confirmPassword}
        />
        <HelperText type="error" visible={!!errors.confirmPassword} style={Styles.helperText}>
          {errors.confirmPassword?.message}
        </HelperText>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            mode='contained'
            onPress={() => navigation.navigate('login')}
            style={Styles.cancelButton}>
            <Text>Voltar</Text>
          </Button>

          <Button
            mode='contained'
            onPress={handleSubmit(onSubmit)}
            style={Styles.defaultButton}>
            <Text>Cadastrar</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Register;
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {Styles} from '../../constants/Styles'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { User } from '../models/User';

interface RegisterProps {
    onBack: () => void;
  }


const Register: React.FC<RegisterProps> = ({ onBack }) => {

    const [user, setUser] = useState<Partial<User>>({
        email: '',
        cpf: '',
        name: '',
        phone: '',
        password: '',
      });
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {

        console.log('handleRegister called');
        console.log('User state:', user);
    console.log('Confirm Password:', confirmPassword);

        if (!user.email || !user.cpf || !user.name || !user.phone || !user.password || !confirmPassword) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
          }
      
          if (user.password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
          }
    

        /*try {
            const response = await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            });
    
            const data = await response.json();
    
            if (response.ok) {
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            // Redirecionar ou limpar o formulário
            } else {
            Alert.alert('Erro', data.message || 'Ocorreu um erro ao realizar o cadastro.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao conectar com o servidor.');
        }
            */
    };
  
        
    return (
            <View style={Styles.container}>
                <View style={Styles.inputContainer}>
                <View style={Styles.headerContainer}>
                <Icon name="person-add" size={100} color="#ec6408" />
                <Text style={Styles.header}>Crie sua conta</Text>
                <Text style={Styles.subText}>Preencha os campos com suas informações</Text>
                </View>
                <TextInput
                    label="Nome Completo"
                    value={user.name}
                    onChangeText={(text) => setUser({ ...user, name: text })}
                    activeUnderlineColor='#ec6408'
                    style={Styles.input}
                />

                <TextInput
                        label="Email"
                        value={user.email}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        activeUnderlineColor='#ec6408'
                        style={Styles.input}
                    />

                <TextInput
                    label="CPF"
                    value={user.cpf}
                    onChangeText={(text) => setUser({ ...user, cpf: text })}
                    keyboardType="numeric"
                    activeUnderlineColor='#ec6408'                    
                    style={Styles.input}
                />

                <TextInput
                    label="Telefone"
                    value={user.phone}
                    onChangeText={(text) => setUser({ ...user, phone: text })}
                    activeUnderlineColor='#ec6408'
                    keyboardType="numeric"
                    style={Styles.input}
                />

                <TextInput
                    label="Senha"
                    value={user.password}
                    activeUnderlineColor='#ec6408'
                    onChangeText={(text) => setUser({ ...user, password: text })}
                    secureTextEntry
                    style={Styles.input}
                />

                <TextInput
                    label="Confirmar Senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    activeUnderlineColor='#ec6408'
                    secureTextEntry
                    style={Styles.input}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Button 
                    mode='contained'
                    onPress={onBack} 
                    style={Styles.cancelButton}>
                    <Text>Voltar</Text>
                    </Button>

                    <Button 
                    mode='contained'
                    onPress={handleRegister}
                    style={Styles.defaultButton}>
                    <Text>Cadastrar</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default Register;
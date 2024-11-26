import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_APIGATEWAY } from './config';


// Instância do axios para configurar a base URL
const api = axios.create({
    baseURL: URL_APIGATEWAY,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Login e token JWT
export async function login(login, senha) {
    try {
        const response = await api.post('/auth/login', { login, senha });
        if (response.data.auth) {
            const token = response.data.token;
            const userData = response.data.data;

            if (token) {
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                return { ...response.data };
            }
        }
    } catch (error) {
        throw error;
    }
}

// Logout
export async function logout(navigation) {
    try {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Auth', { screen: 'Login' }); // Redireciona para a página de login
        console.log('Usuário deslogado com sucesso');
        // Redefine a pilha de navegação para evitar retorno às telas protegidas
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth', screen: 'Login' }],
        });
    } catch (error) {
        console.error('Erro ao realizar logout:', error);
    }
}

// Register (Cadastro de usuário)
export const register = async (formattedUser) => {
    try {
        const response = await api.post('/auth', formattedUser);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error.response?.data?.message || 'Erro ao cadastrar';
    }
};

// Atualizar dados do usuário
export const updateUserData = async (cpf, userData) => {
    try {
        const response = await api.put(`/auth/${cpf}`, userData);
        console.log('apiService_Dados enviados para API:', userData);
        return response.data;

    } catch (error) {
        console.error('Erro ao atualizar os dados:', error);
        throw error;
    }
};

// Excluir conta do usuário
export async function deleteUserAccount(cpf) {
    try {
        console.log(cpf)
        await api.delete(`/auth/cpf/${cpf}`);
    } catch (error) {
        console.error('Erro ao excluir conta:', error.response?.data || error.message);
    }
}

// Solicitar nova senha (IMPLEMENTAR / corrigir)
export const newPassword = async (email) => {
    try {
        const response = await api.post('/auth/recuperar', { email });
        return response.data;
    } catch (error) {
        console.error('Erro ao solicitar nova senha:', error);
        throw error.response?.data?.message || 'Erro ao solicitar nova senha';
    }
};

export default api;
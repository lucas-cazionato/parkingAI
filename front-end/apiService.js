import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiGatewayUrl = 'http://192.168.0.5:3000';

// Instância do axios para configurar a base URL
const api = axios.create({
    baseURL: apiGatewayUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fazer login e receber token JWT
export async function login(login, senha) {
    try {
        const response = await api.post('/auth/login', { login, senha });
        if (response.data.auth) {
            // Salvar token JWT no AsyncStorage para reutilização
            await AsyncStorage.setItem('token', response.data.token);
            return response.data.data;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

// Realizar requisições autenticadas
export async function fetchUserData(endpoint) {
    const token = await AsyncStorage.getItem('token');
    return api.get(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


// Register (Cadastro de usuário)
export const register = async (formattedUser) => {
    try {
        const response = await api.post('/auth', formattedUser);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erro ao cadastrar');
        } else {
            throw new Error('Erro ao cadastrar');
        }
    }
};
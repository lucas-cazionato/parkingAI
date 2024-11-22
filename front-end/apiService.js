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

// Fazer login e receber token JWT
export async function login(login, senha) {
    try {
        const response = await api.post('/auth/login', { login, senha });
        if (response.data.auth) {
            await AsyncStorage.setItem('token', response.data.token);
            console.log('Dados de login armazenados com sucesso!');
            return response.data.data;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

// Realizar requisições autenticadas
export async function fetchUserData(endpoint) {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }
        // Fazendo a requisição com o token no header Authorization
        const response = await api.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Retorna os dados da resposta

    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        throw error; // Lança o erro para ser tratado na função que chamou
    }
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


// Função para atualizar os dados do usuário
export const updateUserData = async (formattedUser) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.put('/user', formattedUser, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erro ao atualizar');
        } else {
            throw new Error('Erro ao atualizar');
        }
    }
};

// Função para excluir a conta do usuário
export const deleteUserAccount = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.delete('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir a conta do usuário:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erro ao excluir a conta');
        } else {
            throw new Error('Erro ao excluir a conta');
        }
    }
};

export const newPassword = async (email) => {
    try {
        const response = await api.post('/auth/forgot', { email });
        return response.data;
    } catch (error) {
        console.error('Erro ao solicitar nova senha:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erro ao solicitar nova senha');
        } else {
            throw new Error('Erro ao solicitar nova senha');
        }
    }
};

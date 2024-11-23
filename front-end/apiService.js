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
            const token = response.data.token;
            const userData = response.data.data; // Inclui CPF, nome, etc.

            if (token) {
                await AsyncStorage.setItem('token', token);     //Armazenar token
                await AsyncStorage.setItem('userData', JSON.stringify(userData)); // Armazenar dados do usuário
                console.log('apiservice_TOKEN:', token);
                console.log('apiService_CPF:', userData.cpf);
                console.log('apiService_DADOS USUÁRIO:', userData);
                return { ...response.data.data, token };
            }
        }
        throw new Error('Autenticação falhou.');
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

// Realizar requisições autenticadas
// export async function getUserDataByCpf(cpf) {
//     try {
//         const token = await AsyncStorage.getItem('token');
//         if (!token) {
//             throw new Error('Token não encontrado');
//         }
//         const response = await api.get('/auth/cpf/$(cpf)', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Erro ao buscar dados do usuário pelo CPF:', error);
//         throw error;
//     }
// }


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
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token não encontrado');

        const response = await api.put(`/auth/${cpf}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        throw error.response?.data?.message || 'Erro ao atualizar os dados';
    }
};

// Excluir conta do usuário
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
        throw error.response?.data?.message || 'Erro ao excluir a conta';
    }
};

// Solicitar nova senha
export const newPassword = async (email) => {
    try {
        const response = await api.post('/auth/forgot', { email });
        return response.data;
    } catch (error) {
        console.error('Erro ao solicitar nova senha:', error);
        throw error.response?.data?.message || 'Erro ao solicitar nova senha';
    }
};
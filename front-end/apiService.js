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

// Requisições autenticadas
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Respostas sem token (logout e exclusao de conta)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) { // Erro de autorização
            await AsyncStorage.clear(); // Limpa o armazenamento local
            navigate('Login'); // Redireciona para a página de login
        }
        return Promise.reject(error); // Continua propagando o erro
    }
);

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

        //Obter o valor do token
        const token1 = await AsyncStorage.getItem('token');
        console.log('logout_token1', token1);

        // Fazer logout e remover o token do AsyncStorage
        await api.post('/logout');
        await AsyncStorage.removeItem('token');
        const token2 = await AsyncStorage.getItem('token');
        console.log('logout_token2', token2);

        // Redirecionar para a página de login
        navigation.navigate('Auth', { screen: 'Login' });
        console.log('logout_Usuário deslogado com sucesso');

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

//Enviar avaliação
export const sendReview = async (reviewToSend) => {
    try {
        const response = await api.post('/quest', reviewToSend);
        return response;

    } catch (error) {
        console.error('Erro ao solicitar enviar avaliação:', error);
        throw error.response?.data?.message || 'Erro ao enviar avaliação';
    }
};
export default api;
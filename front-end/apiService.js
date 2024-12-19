import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_APIGATEWAY, URL_MSPARKING } from './config';


// Instância do axios para configurar a base URL
const api = axios.create({
    baseURL: URL_APIGATEWAY,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Instância do axios para configurar a base URL do ms-parking
const api_parking = axios.create({
    baseURL: URL_MSPARKING,
    headers: {
        'Content-Type': 'application/json',
    },
});


// (req) Requisições autenticadas
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

// Login e token JWT
export async function login(login, senha) {
    try {
        const response = await api.post('/auth/login', { login, senha });
        if (response.data.auth) {
            console.log('USUÁRIO LOGADO COM SUCESSO!')
            const token = response.data.token;
            const userData = response.data.data;
            console.log('Dados do usuario logado:');
            console.log('   Nome: ', userData.nome);
            console.log('   CPF: ', userData.cpf);
            console.log('   Data de Nascimento: ', userData.dataNascimento);
            console.log('   E-mail: ', userData.login);
            console.log('   Telefone: ', userData.telefone);
            console.log('   Token: ', token);

            if (token) {
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('userData', JSON.stringify(userData));
                return { ...response.data };
            }
        }
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('\nUsuário ou senha inválido(a).\n\nTente novamente.');
        }
        throw new Error(error.response?.data?.message || 'Erro ao autenticar');
    }
}


// Logout
export async function logout(navigation) {
    try {

        //Obter o valor do token
        const token1 = await AsyncStorage.getItem('token');
        console.log('logout - Token antes do logout: ', token1);

        // Fazer logout e remover o token do AsyncStorage
        await api.post('/logout');
        await AsyncStorage.removeItem('token');
        const token2 = await AsyncStorage.getItem('token');
        console.log('logout - Token depois do logout: ', token2);

        // Redirecionar para a página de login
        navigation.navigate('Auth', { screen: 'Login' });
        console.log('logout - USUÁRIO DESLOGADO COM SUCESSO!');

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
        if (error.response?.status === 409) {
            throw new Error('\nUsuário já cadastrado. \n\nTente novamente com outro CPF ou e-mail.');
        }
        throw new Error(error.response?.data?.message || 'Erro ao cadastrar usuário');
    }
}


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

// Atualizar senha do usuário
export const updateUserPassword = async (novaSenha) => {
    try {
        const token = await AsyncStorage.getItem('token');      // Recuperar o token e os dados do usuário do AsyncStorage
        const userData = await AsyncStorage.getItem('userData');
        if (!token || !userData) {
            console.error('Dados do usuário não encontrados!');
            throw new Error('Dados do usuário não encontrados!');
        }
        console.log("Dados do usuário recuperados do AsyncStorage:", userData);
        const parsedUserData = JSON.parse(userData);
        const { cpf, id, login, nome, dataNascimento, telefone } = parsedUserData;
        const updatedUserData = {       // Atualizar a senha no objeto de dados do usuário
            id,
            cpf,
            login,
            nome,
            dataNascimento,
            telefone,
            senha: novaSenha  // Altera apenas a senha
        };
        const response = await api.put(`/auth/${cpf}`, updatedUserData);         // Chamar a API para atualizar os dados do usuário
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));         // Armazenar no AsyncStorage os dados atualizados com a nova senha
        const storedUserData = await AsyncStorage.getItem('userData');      // Verificar se os dados foram atualizados corretamente no AsyncStorage
        console.log("Dados atualizados no AsyncStorage:", storedUserData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar a senha:', error);
        throw error;
    }
};


// Excluir conta do usuário
export async function deleteUserAccount(cpf) {
    try {
        console.log(cpf)
        await api.delete(`/auth/cpf/${cpf}`);
        console.error('Conta excluída com sucesso!',);
    } catch (error) {
        console.error('Erro ao excluir conta:', error.response?.data || error.message);
    }
}

// Solicitar nova senha 
export const newPassword = async (login) => {
    try {

        const response = await api.post('/auth/recuperar', login);

        return response;

    } catch (error) {
        console.error('Erro ao solicitar nova senha:', error);
        throw error.response?.data?.message || 'Erro ao solicitar nova senha';
    }
};


export const sendReview = async (reviewToSend) => {
    try {
        const response = await api.post('/quest', reviewToSend);
        return response;

    } catch (error) {
        console.error('Erro ao solicitar enviar avaliação:', error);
        throw error.response?.data?.message || 'Erro ao enviar avaliação';
    }
};


export const getFavorites = async (cpfUsuario) => {
    try {
        const response = await api.get(`/favoritos/cpf/${cpfUsuario}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        throw error;
    }
};

export const updateFavorite = async (id, favoriteData) => {
    try {
        const response = await api.put(`/favoritos/${id}`, favoriteData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar favorito:', error);
        throw error;
    }
};

export const addFavorite = async (favoriteData) => {
    try {
        const response = await api.post('/favoritos', favoriteData);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar favorito:', error);
        throw error;
    }
};

export async function deleteFavorite(id) {
    try {
        console.log(id);
        await api.delete(`/favoritos/id/${id}`);
        console.error('Conta excluída com sucesso!');
    } catch (error) {
        console.error('Erro ao excluir conta:', error.response?.data || error.message);
    }
}

// Chamada API ms_parking com retorno das vagas
export const fetchParkingSpots = async (destination) => {
    try {
        const response = await api_parking.post('/parking', destination);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os dados de estacionamento:", error);
        throw error.response?.data?.message || "Erro ao buscar vagas de estacionamento";
    }
};

// Chamada API ms_parking com retorno das vagas de simulação
export const fetchParkingSpotsSimulation = async (simulation) => {
    try {
        const response = await api_parking.post('/parking', simulation);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os dados de estacionamento:", error);
        throw error.response?.data?.message || "Erro ao buscar vagas de estacionamento";
    }
};

export default api;
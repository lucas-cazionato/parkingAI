import axios from 'axios';

const apiGatewayUrl = 'http://localhost:3000';

// Fazer login e receber token JWT
export async function login(login, senha) {
    try {
        const response = await axios.post(`${apiGatewayUrl}/auth/login`, { login, senha });
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
    return axios.get(`${apiGatewayUrl}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
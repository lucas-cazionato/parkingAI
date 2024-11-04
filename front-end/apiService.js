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


// Register (Cadastro de usuário)
export const register = async (userData) => {
    const response = await fetch(`${apiGatewayUrl}/auth`, { // Usando a constante apiGatewayUrl
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar');
    }

    return response.json();
};
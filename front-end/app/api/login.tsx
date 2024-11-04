
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { API_URL } from './config';
// import { Login } from '../models/loginModel';
// import { User } from '../models/User';

// interface LoginResponse {
//   data: User;
// }

// export const login = async (login: Login): Promise<User> => {
//   try {
//     const response = await axios.post<LoginResponse>(`${API_URL}/login`, login);
//     const loggedUser = response.data.data;
//     console.log(response);

//     await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
//     return { ...loggedUser };
//   } catch (error) {
//     throw error;
//   }
// };

// export const register = async (user: Partial<User>): Promise<User> => {
//   try {
//     const response = await axios.post<LoginResponse>(`${API_URL}/register`, user);
//     const loggedUser = response.data.data;
//     await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
//     return { ...loggedUser };
//   } catch (error) {
//     throw error;
//   }
// };

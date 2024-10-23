/*
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';
import { Login } from '../models/loginModel';
import { User } from '../models/User';

export const login = async (login: Login) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: {
        email: login.email,
        password: login.password,
      },
    });

    const users = response.data;
    if (users.length === 0) {
      throw new Error('Invalid email or password');
    }

    const loggedUser = users[0];
    await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    return { ...loggedUser };
  } catch (error) {
    throw error;
  }
};

export const register = async (user: Partial<User>) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    const registeredUser = response.data;
    await AsyncStorage.setItem('user', JSON.stringify(registeredUser));
    return { ...registeredUser };
  } catch (error) {
    throw error;
  }
};
*/
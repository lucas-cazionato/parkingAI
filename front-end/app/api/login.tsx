/*
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';
import { loginModel } from '../models/loginModel';
import { User } from '../models/user';

export const login = async (login : loginModel)  => {
  try {
    const response = await axios.post(`${API_URL}/login`, login);
    const loggedUser = response.data;
    console.log(response);
    
    await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    return { ...loggedUser};
  } catch (error) {
    throw error;
  }
};

export const register = async (user : Partial<User>)  => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    const loggedUser = response.data;
    await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    return { ...loggedUser};
  } catch (error) {
    throw error;
  }
};
*/
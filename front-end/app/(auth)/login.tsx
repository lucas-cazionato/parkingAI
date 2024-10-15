/*
import React, {useState} from 'react';
import { View, Text, TextInput, Image, Pressable, Alert} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Styles, Images, Colors } from '@/constants';
import { Link, useRouter } from 'expo-router';
import { login } from '../api/login';


const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  //const router = useRouter();
  /*
  const handleLogin = async () =>{
    try {
      await login({"email": email,"password": password});
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Login Error' + error.message);
    }
  };
/
  return (
    <View style={Styles.container}>
    <Image source={Images.logo} style={Styles.image} />
    <View style={Styles.inputContainer}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={Styles.input}
      />
      <Text></Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.input}
      />
      <View style={Styles.rememberMeContainer}>
        <CheckBox
          title={"Remember Me"}
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
        />
      </View>
      <Pressable 
        style={Styles.mainButton}
        onPress={handleLogin}>
        <Text style={Styles.largeWhiteText}>Login</Text>
      </Pressable>
    </View>
    <View style={Styles.registerContainer}>
      <Text style={Styles.whiteText}>Don't have an account? </Text>
      {/* <TouchableOpacity onPress={() => console.log('Navigate to Register screen')}>
        <Text style={Styles.registerText}>Register</Text>
      </TouchableOpacity>}
      <Link href="/register" style={{color: Colors.primary}}>Register</Link>
    </View>
  </View>      
  );
}

export default Login;

*/
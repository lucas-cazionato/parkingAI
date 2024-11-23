import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Surface } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useForm, Controller } from 'react-hook-form';
import { getUserDataByCpf, updateUserData, deleteUserAccount, login } from '../../apiService';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Styles } from '../../constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';



type UserAccountNavigationProp = NavigationProp<any, 'UserAccount'>;

interface FormData {
    nome: string;
    email: string;
    telefone: string;
}

const UserAccount: React.FC = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<UserAccountNavigationProp>();

    const phoneInputRef = React.useRef<TextInputMask>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                setIsLoading(true);

                //Recuperar token e dados do usuário armazenados no AsyncStorage
                const token = await AsyncStorage.getItem('token');
                const storedUserData = await AsyncStorage.getItem('userData');
                const userData = storedUserData ? JSON.parse(storedUserData) : null;

                console.log("userAccount_TOKEN:", token);
                console.log('userAccount_CPF:', userData.cpf);
                console.log('userAccount_DADOS USUÁRIO:', userData);

                if (!token || !userData) {
                    throw new Error('Informações do usuário não encontradas');
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUserData();
    }, []);

    const handleUpdate = async (data: FormData) => {
        try {
            setIsLoading(true);
            await updateUserData(data);
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            'Excluir Conta',
            'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            await deleteUserAccount();
                            Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.');
                            navigation.navigate('Login');
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível excluir a conta.');
                        } finally {
                            setIsLoading(false);
                        }
                    }
                },
            ]
        );
    };

    return (
        <View style={Styles.container}>
            <Surface style={Styles.surface}>
                <Text style={Styles.header}>Gerenciar Conta</Text>
            </Surface>

            <View style={Styles.inputContainer}>
                <Controller
                    control={control}
                    name="nome"
                    rules={{ required: 'Nome é obrigatório' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                label="Nome Completo"
                                value={value || ''}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                activeUnderlineColor="#ec6408"
                                style={Styles.input}
                                error={!!errors.nome}
                            />
                            <HelperText type="error" visible={!!errors.nome} style={Styles.helperText}>
                                {errors.nome?.message}
                            </HelperText>
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Email é obrigatório',
                        pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                label="Email"
                                value={value || ''}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                activeUnderlineColor="#ec6408"
                                keyboardType="email-address"
                                style={Styles.input}
                                autoCapitalize="none"
                                error={!!errors.email}
                            />
                            <HelperText type="error" visible={!!errors.email} style={Styles.helperText}>
                                {errors.email?.message}
                            </HelperText>
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="telefone"
                    rules={{
                        required: 'Telefone é obrigatório',
                        pattern: { value: /^\(\d{2}\) \d{4,5}-\d{4}$/, message: 'Telefone inválido' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                label="Telefone"
                                value={value || ''}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                activeUnderlineColor="#ec6408"
                                style={Styles.input}
                                error={!!errors.telefone}
                                render={props => (
                                    <TextInputMask
                                        {...props}
                                        type={'cel-phone'}
                                        options={{
                                            maskType: 'BRL',
                                            withDDD: true,
                                            dddMask: '(99) ',
                                        }}
                                        value={value}
                                        onChangeText={onChange}
                                        ref={phoneInputRef}
                                    />
                                )}
                            />
                            <HelperText type="error" visible={!!errors.telefone} style={Styles.helperText}>
                                {errors.telefone?.message}
                            </HelperText>
                        </>
                    )}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Button
                        mode="contained"
                        onPress={handleSubmit(handleUpdate)}
                        style={Styles.defaultButton}
                        loading={isLoading}
                    >
                        Salvar Alterações
                    </Button>
                    <Button
                        mode="contained"
                        onPress={handleDeleteAccount}
                        style={Styles.cancelButton}
                    >
                        Excluir Conta
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default UserAccount;

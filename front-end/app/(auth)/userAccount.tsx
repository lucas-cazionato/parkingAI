import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Surface } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { fetchUserData, updateUserData, deleteUserAccount } from '../../apiService';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Styles } from '../../constants/Styles';

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

    useEffect(() => {
        const loadUserData = async () => {
            try {
                setIsLoading(true);
                // Chama a função fetchUserData e pega apenas a propriedade data
                const response = await fetchUserData('/auth/user'); // Ou o endpoint que você está usando
                reset(response.data); // Passa apenas a propriedade 'data' para o reset
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, [reset]);

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
                                label="Nome"
                                value={value || ''}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                activeUnderlineColor="#ec6408"
                                style={Styles.input}
                                error={!!errors.nome}
                            />
                            <HelperText type="error" visible={!!errors.nome}>
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
                                style={Styles.input}
                                error={!!errors.email}
                            />
                            <HelperText type="error" visible={!!errors.email}>
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
                        pattern: { value: /^\(\d{2}\) \d{4,5}\-\d{4}$/, message: 'Telefone inválido' },
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
                            />
                            <HelperText type="error" visible={!!errors.telefone}>
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

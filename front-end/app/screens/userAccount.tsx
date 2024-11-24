import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Surface } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useForm, Controller } from 'react-hook-form';
import { updateUserData, deleteUserAccount } from '../../apiService';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Styles } from '../../constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type UserAccountNavigationProp = NavigationProp<any, 'UserAccount'>;

interface FormData {
    nome: string;
    login: string;
    telefone: string;
    cpf: string;
    dataNascimento: string;
}

const UserAccount: React.FC = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [cpf, setCpf] = useState('');
    const navigation = useNavigation<UserAccountNavigationProp>();

    const phoneInputRef = React.useRef<TextInputMask>(null);

    const formatCpf = (cpf: string): string => {
        // CPF com pontos e traço
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

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
                // Preencher os campos do formulário com os dados do usuário
                setCpf(userData.cpf);
                reset({
                    nome: userData.nome,
                    login: userData.login ?? userData.email ?? '',
                    telefone: userData.telefone,
                    cpf: userData.cpf,
                    dataNascimento: userData.dataNascimento,
                });
                console.log('Dados resetados no formulário:', {
                    nome: userData.nome,
                    email: userData.email,
                    telefone: userData.telefone,
                    cpf: userData.cpf,
                    dataNascimento: userData.dataNascimento,
                });


            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUserData();
    }, [reset]);

    const handleUpdate = async (data: FormData) => {
        try {
            setIsLoading(true);

            console.log('userAccount_Dados enviados para atualização:', data);
            const updatedData = await updateUserData(cpf, data);

            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));

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
            <ScrollView>
                <View style={Styles.inputContainer}>
                    <Surface style={Styles.surface} elevation={4}>
                        <Icon name="person" size={50} color="#ec6408" />
                        <Text style={Styles.header}>Minha conta</Text>
                        <Text style={Styles.subText}>Gerencie informações da conta</Text>
                    </Surface>


                    <Controller
                        control={control}
                        name="cpf"
                        rules={{ required: 'Cpf é obrigatório' }}
                        render={({ field: { value } }) => (
                            <>
                                <TextInput
                                    label="CPF (Não pode ser alterado)"
                                    value={formatCpf(cpf) || value || ''}
                                    editable={false} // campo não editável
                                    activeUnderlineColor="transparent" // Remove a linha ativa
                                    style={[Styles.input, Styles.nonEditableInput]} // Adiciona estilo personalizado
                                />
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="nome"
                        rules={{ required: 'Nome é obrigatório' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    label="Nome completo"
                                    value={value || ''}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    activeUnderlineColor="#ec6408"
                                    style={Styles.input}
                                    error={!!errors.nome}
                                />
                            </>
                        )}
                    />



                    <Controller
                        control={control}
                        name="login"
                        rules={{
                            required: 'Email é obrigatório',
                            pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    label="E-mail"
                                    value={value || ''}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    activeUnderlineColor="#ec6408"
                                    keyboardType="email-address"
                                    style={Styles.input}
                                    autoCapitalize="none"
                                    error={!!errors.login}
                                />
                                <HelperText type="error" visible={!!errors.login} style={Styles.helperText}>
                                    {errors.login?.message}
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
            </ScrollView>
        </View>
    );
};

export default UserAccount;

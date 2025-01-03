import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, HelperText, Surface } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { useForm, Controller } from 'react-hook-form';
import { updateUserData, deleteUserAccount } from '../../apiService';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Styles } from '../../constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


type UserAccountNavigationProp = NavigationProp<RootStackParamList, 'UserAccount'>;


type RootStackParamList = {
    Auth: { screen: string }; // Permite navegar para telas no AuthStackNavigator
    UserAccount: undefined;
    Main: undefined;
    MapHome: undefined;
    changePassword: undefined;
    Senha: undefined;
    Conta: undefined;
};

interface FormData {
    nome: string;
    login: string;
    telefone: string;
    cpf: string;
    dataNascimento: string;
}

const UserAccount: React.FC = () => {
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState(false);
    const [cpf, setCpf] = useState('');
    const [originalData, setOriginalData] = useState<FormData | null>(null); // Dados originais (antes das alterações)
    const navigation = useNavigation<UserAccountNavigationProp>();
    const phoneInputRef = React.useRef<TextInputMask>(null);
    const dateInputRef = useRef<TextInputMask>(null);

    const formatCpf = (cpf: string): string => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');         // CPF com pontos e traço
    };

    const formatDateToDDMMYYYY = (dateString: string): string => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const formatDateToYYYYMMDD = (dateString: string): string => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    const handleNavigateToChangePassword = () => {
        navigation.navigate('Senha');
    };

    // Verificar se os valores do formulário são diferentes dos dados originais p/ ativar o botão salvar
    const formValues = watch(); // Monitorar os valores do formulário
    const isFormChanged = originalData &&
        (formValues.nome !== originalData.nome ||
            formValues.login !== originalData.login ||
            formValues.telefone !== originalData.telefone ||
            formValues.dataNascimento !== originalData.dataNascimento);


    const handleUpdate = async (data: FormData) => {
        try {

            setIsLoading(true);

            //Formatar a data
            const formattedData = {
                ...data,
                dataNascimento: formatDateToYYYYMMDD(data.dataNascimento), // Converter para YYYY-MM-DD
            };

            console.log('Dados enviados para atualização:', formattedData);

            //Atualizat os dados do usuário
            const updatedData = await updateUserData(cpf, formattedData);

            //Armazenar os dados atualizados no AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(updatedData));

            // Atualizar os dados originais no estado
            setOriginalData(updatedData);

            // Resetar o formulário com os dados atualizados
            reset({
                nome: updatedData.nome,
                login: updatedData.login,
                telefone: updatedData.telefone,
                cpf: updatedData.cpf,
                dataNascimento: formatDateToDDMMYYYY(updatedData.dataNascimento),
            });
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');

            // Recarregar a tela UserAccount após a atualização
            navigation.reset({
                index: 0,
                routes: [{ name: 'Conta' }],
            });
            console.log('Available routes:', navigation.getState().routes);


        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados.');
        } finally {
            setIsLoading(false);
            useEffect;
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
                            await deleteUserAccount(cpf);
                            await AsyncStorage.clear(); // Limpar o AsyncStorage
                            Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.');
                            navigation.navigate('Auth', { screen: 'Login' });

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

                setCpf(userData.cpf);
                setOriginalData({
                    nome: userData.nome,
                    login: userData.login,
                    telefone: userData.telefone,
                    cpf: userData.cpf,
                    dataNascimento: formatDateToDDMMYYYY(userData.dataNascimento),
                });

                reset({
                    nome: userData.nome,
                    login: userData.login,
                    telefone: userData.telefone,
                    cpf: userData.cpf,
                    dataNascimento: formatDateToDDMMYYYY(userData.dataNascimento),
                });

                console.log('Dados resetados no formulário:', userData);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUserData();
    }, []);




    return (
        <View style={Styles.container}>
            <ScrollView>
                <View style={Styles.inputContainer}>
                    <Surface style={Styles.surface} elevation={4}>
                        <Icon name="person" size={80} color="#ec6408" />
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
                                <HelperText type="error" visible={!!errors.login} style={Styles.helperText}>
                                    {errors.cpf?.message}
                                </HelperText>
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
                                <HelperText type="error" visible={!!errors.login} style={Styles.helperText}>
                                    {errors.nome?.message}
                                </HelperText>
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
                                <HelperText type="error"
                                    visible={!!errors.telefone}
                                    style={Styles.helperText}
                                >
                                    {errors.telefone?.message}
                                </HelperText>
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="dataNascimento"
                        rules={{
                            required: 'Data de nascimento é obrigatória',
                            validate: {
                                isValidDate: (value) => {
                                    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
                                    if (!regex.test(value)) {
                                        return 'Data inválida. Use o formato DD/MM/YYYY';
                                    }
                                    const [day, month, year] = value.split('/').map(Number);
                                    const date = new Date(year, month - 1, day);
                                    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
                                        return 'Data inválida. O dia deve ser entre 01 e 31. O mês deve ser entre 01 e 12. O ano deve ser superior a 1900.';

                                    }
                                    return true;
                                },
                                isNotFutureDate: (value) => {
                                    const [day, month, year] = value.split('/').map(Number);
                                    const inputDate = new Date(year, month - 1, day);
                                    const today = new Date();

                                    if (inputDate > today) {
                                        return 'A data de nascimento não pode ser no futuro';
                                    }
                                    return true;
                                },
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <TextInput
                                    label="Data de nascimento"
                                    value={value || ''}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    activeUnderlineColor="#ec6408"
                                    style={Styles.input}
                                    error={!!errors.dataNascimento}
                                    render={props => (
                                        <TextInputMask
                                            {...props}
                                            type={'datetime'}
                                            options={{
                                                format: 'DD/MM/YYYY',
                                            }}
                                            value={value}
                                            onChangeText={onChange}
                                            ref={dateInputRef}  // Referência para máscara
                                        />
                                    )}
                                />
                                <HelperText type="error" visible={!!errors.dataNascimento} style={Styles.helperText}>
                                    {errors.dataNascimento?.message}
                                </HelperText>
                            </>
                        )}
                    />

                    <TextInput
                        label="Senha"
                        style={[Styles.input, Styles.nonEditableInput]}
                        value="••••••••"
                        editable={false}
                        selectTextOnFocus={false}
                        activeUnderlineColor='#ec6408'
                    />
                    <Text style={Styles.passwordText}>
                        (Clique{' '}
                        <Text
                            style={Styles.linkText}
                            onPress={handleNavigateToChangePassword}
                        >
                            aqui
                        </Text>{' '}
                        para alterar a senha)
                    </Text>
                    <View style={Styles.registerContainer}></View>
                    <View style={Styles.registerContainer}>
                        <Button
                            mode="contained"
                            onPress={handleSubmit(handleUpdate)}
                            style={[Styles.defaultButton, !isFormChanged && Styles.disabledButton]}

                            disabled={!isFormChanged || isLoading} // Botão desabilitado se o formulário não tiver alterações ou se estiver carregando
                        >
                            Salvar Alterações
                        </Button>
                    </View>
                    <View style={Styles.registerContainer}>
                        <Button
                            mode="contained"
                            onPress={handleDeleteAccount}
                            style={Styles.cancelButton}
                        >
                            Excluir Conta
                        </Button>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={Styles.backButton}
                            onPress={() => {
                                if (originalData) {
                                    reset(originalData); // Restaura os valores originais
                                    setOriginalData(originalData); // Atualiza o estado com os valores originais
                                    navigation.goBack(); // Navega para a tela anterior
                                } else {
                                    Alert.alert('Erro', 'Os dados originais não estão disponíveis.');
                                }
                            }}
                        >
                            <Icon name="arrow-left" size={50} color="#687076" />
                            <Text style={[Styles.textInput, { marginLeft: 10 }]}
                            >Voltar
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView >
        </View >
    );
};

export default UserAccount;

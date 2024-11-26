import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, HelperText, Surface } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword: React.FC = () => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm<ChangePasswordData>();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const handleUpdatePassword = async (data: ChangePasswordData) => {
        try {
            setIsLoading(true);

            if (data.newPassword !== data.confirmPassword) {
                Alert.alert('Erro', 'As senhas não coincidem');
                return;
            }

            // Lógica para alterar a senha no backend
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Erro', 'Não foi possível identificar o usuário');
                return;
            }

            // Aqui você fará a chamada para o serviço que altera a senha do usuário
            console.log('Alterando a senha do usuário com os dados:', data);

            Alert.alert('Sucesso', 'Senha alterada com sucesso!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível alterar a senha');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.inputContainer}>
                <Surface style={Styles.surface} elevation={4}>
                    <Icon name="lock" size={50} color="#ec6408" />
                    <Text style={Styles.header}>Alterar Senha</Text>
                    <Text style={Styles.subText}>Gerencie sua senha de acesso</Text>
                </Surface>

                <Controller
                    control={control}
                    name="oldPassword"
                    rules={{ required: 'Senha atual é obrigatória' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                label="Senha Atual"
                                secureTextEntry
                                value={value || ''}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                activeUnderlineColor="#ec6408"
                                style={Styles.input}
                                error={!!errors.oldPassword}
                            />
                            <HelperText type="error" visible={!!errors.oldPassword} style={Styles.helperText}>
                                {errors.oldPassword?.message}
                            </HelperText>
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="newPassword"
                    rules={{ required: 'Nova senha é obrigatória' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                label="Nova Senha"
                                secureTextEntry
                                value={value || ''}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                activeUnderlineColor="#ec6408"
                                style={Styles.input}
                                error={!!errors.newPassword}
                            />
                            <HelperText type="error" visible={!!errors.newPassword} style={Styles.helperText}>
                                {errors.newPassword?.message}
                            </HelperText>
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{ required: 'Confirmação de senha é obrigatória' }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                label="Confirmar Senha"
                                secureTextEntry
                                value={value || ''}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                activeUnderlineColor="#ec6408"
                                style={Styles.input}
                                error={!!errors.confirmPassword}
                            />
                            <HelperText type="error" visible={!!errors.confirmPassword} style={Styles.helperText}>
                                {errors.confirmPassword?.message}
                            </HelperText>
                        </>
                    )}
                />

                <View style={Styles.registerContainer}>
                    <Button
                        mode="contained"
                        onPress={handleSubmit(handleUpdatePassword)}
                        style={Styles.defaultButton}
                        loading={isLoading}
                    >
                        Alterar Senha
                    </Button>
                </View>

                <TouchableOpacity
                    style={Styles.backButton}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="arrow-left" size={50} color="#687076" />
                    <Text style={[Styles.textInput, { marginLeft: 10 }]}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePassword;

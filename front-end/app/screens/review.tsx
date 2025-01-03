import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, RadioButton, TextInput, Surface, HelperText } from 'react-native-paper';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Styles } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp } from '@react-navigation/native';
import { ReviewModel } from '../models/reviewModel';
import { sendReview } from '@/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import * as Location from 'expo-location';


type ReviewProps = {
  navigation: NavigationProp<any>;
};

interface ExtendedReviewModel extends ReviewModel {
  cpfUsuario: string;
  location?: { lat: number; lng: number } | null;
}

export default function Review({ navigation }: ReviewProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<ExtendedReviewModel>();
  const [cpf, setCpf] = useState<string>('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [questionario, setQuestionario] = useState<ReviewModel>({
    achouVaga: 'SIM',
    notaGeral: 5,
    comentario: '',
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {

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

      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
        console.error(error);
      }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Permissão para acessar localização foi negada.');
          return;
        }


        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      
    };
    loadUserData();
  }, []);

  const onSubmit: SubmitHandler<ExtendedReviewModel> = async (data) => {
    if (!questionario) {
      console.error("Review is null, cannot submit.");
      return;
    }

    const reviewData = { ...data, cpf,location };

    const reviewToSend: ExtendedReviewModel = {
      cpfUsuario: reviewData.cpf,
      achouVaga: questionario.achouVaga,
      notaGeral: questionario.notaGeral,
      comentario: questionario.comentario.trim(),
      location: reviewData.location,
    };

    try {
      const response = await sendReview(reviewToSend);
      console.log('Avaliação enviada:', reviewToSend);

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
        console.log('Avaliação enviada com sucesso:', data);
        navigation.navigate('Mapa');

      } else {
        console.error('Erro :', response.statusText);
        Alert.alert('Erro', 'Erro ao enviar avaliação.');
      }

    } catch (error: any) {
      console.error('Erro ao enviar avaliação:', error);

      let errorMessage = 'Erro desconhecido ao enviar avaliação.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;

      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      Alert.alert('Erro', errorMessage);
    }
  };

  return (
    <ScrollView>
      <View style={Styles.container}>
        <View style={Styles.inputContainer}>
          <Surface style={Styles.surface} elevation={4}>
            <Icon name="star" size={80} color="#ec6408" />
            <Text style={Styles.header}>Avalie sua experiência</Text>
          </Surface>

          <Text style={Styles.question}>Você encontrou uma vaga?</Text>
          <Controller
            control={control}
            name="achouVaga"
            rules={{ required: 'Campo obrigatório' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <RadioButton.Group
                  onValueChange={(achouVaga) => {
                    onChange(achouVaga);
                    setQuestionario((prevReview) => ({
                      ...prevReview,
                      achouVaga: achouVaga as 'SIM' | 'NÃO',
                    }));
                  }}
                  value={value}
                >
                  <View style={Styles.radioButtonContainer}>
                    <RadioButton value="SIM" color="#ec6408" />
                    <Text style={Styles.radioButtonLabel}>Sim</Text>
                  </View>
                  <View style={Styles.radioButtonContainer}>
                    <RadioButton value="NÃO" color="#ec6408" />
                    <Text style={Styles.radioButtonLabel}>Não</Text>
                  </View>
                </RadioButton.Group>
                <HelperText type="error" visible={!!errors.achouVaga} style={Styles.helperText}>
                  {errors.achouVaga?.message}
                </HelperText>
              </>
            )}
          />
        </View>

        <View style={Styles.inputContainer}>
          <Text style={Styles.question}>Como você avalia sua experiência com o ParkingAI?</Text>
          <Controller
            control={control}
            name="notaGeral"
            rules={{ required: 'Campo obrigatório' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <RadioButton.Group
                  onValueChange={(notaGeral) => {
                    const nota = parseInt(notaGeral, 10);
                    onChange(nota); // Atualiza o valor do formulário com número
                    setQuestionario((prevReview) => ({
                      ...prevReview,
                      notaGeral: nota, // Atualiza o estado com o número
                    }));
                  }}
                  value={value?.toString() || '0'} // Converte o valor para string
                >
                  <View style={Styles.radioButtonContainer}>
                    <RadioButton value="5" color="#ec6408" />
                    <Text style={Styles.radioButtonLabel}>Muito boa 😁</Text>
                  </View>
                  <View style={Styles.radioButtonContainer}>
                    <RadioButton value="4" color="#ec6408" />
                    <Text style={Styles.radioButtonLabel}>Boa 🙂</Text>
                  </View>
                  <View style={Styles.radioButtonContainer}>
                    <RadioButton value="3" color="#ec6408" />
                    <Text style={Styles.radioButtonLabel}>Regular 😐</Text>
                  </View>
                  <View style={Styles.radioButtonContainer}>
                    <RadioButton value="2" color="#ec6408" />
                    <Text style={Styles.radioButtonLabel}>Ruim 🙁</Text>
                  </View>
                  <View style={Styles.radioButtonContainer}>
                    <RadioButton value="1" color="#ec6408" />
                    <Text style={Styles.radioButtonLabel}>Muito ruim 😣</Text>
                  </View>
                </RadioButton.Group>
                <HelperText type="error" visible={!!errors.notaGeral} style={Styles.helperText}>
                  {errors.notaGeral?.message}
                </HelperText>
              </>
            )}
          />
        </View>

        <View style={Styles.inputContainer}>
          <Text style={Styles.question}>Comentários</Text>
          <Controller
            control={control}
            name="comentario"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  label="(Opcional)"
                  value={value || ''}
                  onBlur={onBlur}
                  onChangeText={(comentario) => {
                    onChange(comentario);
                    setQuestionario({
                      ...questionario,
                      comentario: comentario || '',
                    });
                  }}
                  mode="outlined"
                  outlineColor="#ec6408"
                  activeOutlineColor="#ec6408"
                  style={Styles.textInput}
                  error={!!errors.comentario}
                />
                <HelperText type="error" visible={!!errors.comentario} style={Styles.helperText}>
                  {errors.comentario?.message}
                </HelperText>
              </>
            )}
          />
        </View>

        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={Styles.defaultButton}>
          Enviar Avaliação
        </Button>

      </View>
    </ScrollView>
  );
}
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


type ReviewProps = {
  navigation: NavigationProp<any>;
};

interface ExtendedReviewModel extends ReviewModel {
  cpf: string;
}

export default function Review({ navigation }: ReviewProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<ExtendedReviewModel>();
  const [cpf, setCpf] = useState<string>('');
  const [questionario, setQuestionario] = useState<ReviewModel>({
    achouVaga: 'SIM',  
    notaGeral: 5,      
    comentario: '',    
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        const userData = storedUserData ? JSON.parse(storedUserData) : null;

        if (userData && userData.cpf) {
          setCpf(userData.cpf);
        } else {
          throw new Error('Informações do usuário não encontradas');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    loadUserData();
  }, []);

  const onSubmit: SubmitHandler<ExtendedReviewModel> = async (data) => {
    if (!questionario) {
      console.error("Review is null, cannot submit.");
      return;
    }

    const reviewData = { ...data, cpf };

    const reviewToSend: ExtendedReviewModel = {
      cpf: reviewData.cpf,
      achouVaga: questionario.achouVaga, 
      notaGeral: questionario.notaGeral, 
      comentario: questionario.comentario.trim(),      
    };

    try {
      const response = await sendReview(reviewToSend);
      console.log('Avaliação enviada:', reviewToSend);


      if (response.ok) {
        console.log('Avaliação enviada com sucesso:', data);
        navigation.goBack();
      } else {
        console.error('Erro ao enviar avaliação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  return (
    <View style={Styles.container}>
    <ScrollView>
      <View style={Styles.inputContainer}>
        <Surface style={Styles.surface} elevation={4}>
          <Icon name="star" size={100} color="#ec6408" />
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
                        achouVaga: achouVaga as 'SIM' | 'NAO',
                      }));
                    }}
                    value={value}
                  >
                <View style={Styles.radioButtonContainer}>
                  <RadioButton value="SIM" color="#ec6408" />
                  <Text style={Styles.radioButtonLabel}>Sim</Text>
                </View>
                <View style={Styles.radioButtonContainer}>
                  <RadioButton value="NAO" color="#ec6408" />
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

      <View style={Styles.separator} />

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
                  <Text style={Styles.radioButtonLabel}>5</Text>
                </View>
                <View style={Styles.radioButtonContainer}>
                  <RadioButton value="4" color="#ec6408" />
                  <Text style={Styles.radioButtonLabel}>4</Text>
                </View>
                <View style={Styles.radioButtonContainer}>
                  <RadioButton value="3" color="#ec6408" />
                  <Text style={Styles.radioButtonLabel}>3</Text>
                </View>
                <View style={Styles.radioButtonContainer}>
                  <RadioButton value="2" color="#ec6408" />
                  <Text style={Styles.radioButtonLabel}>2</Text>
                </View>
                <View style={Styles.radioButtonContainer}>
                  <RadioButton value="1" color="#ec6408" />
                  <Text style={Styles.radioButtonLabel}>1</Text>
                </View>
              </RadioButton.Group>
              <HelperText type="error" visible={!!errors.notaGeral} style={Styles.helperText}>
                {errors.notaGeral?.message}
              </HelperText>
            </>
          )}
        />
      </View>

      <View style={Styles.separator} />

      <View style={Styles.inputContainer}>
       <Text style={Styles.question}>Como você avalia sua experiência com o ParkingAI?</Text>
        <Controller
          control={control}
          name="comentario"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
            <TextInput
              label="Comentários adicionais"
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
    </ScrollView>
   </View>
  );
}
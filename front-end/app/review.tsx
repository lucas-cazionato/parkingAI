import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { Styles } from '../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { NavigationProp } from '@react-navigation/native';

type ReviewProps = {
  navigation: NavigationProp<any>;
};

export default function Review({ navigation }: ReviewProps) {
  const [foundSpot, setFoundSpot] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    console.log('Avaliação enviada:', { foundSpot, rating, comments });
    // implementar logica de envio da avaliação
    navigation.goBack();
  };

  return (
    <View style={Styles.container}>
        
        <View style={Styles.inputContainer}>
            <View style={Styles.headerContainer}>
            <Icon name="star" size={100} color="#ec6408" />
            <Text style={Styles.header}>Avalie sua experiência</Text>
            </View>

            <Text style={Styles.question}>Você encontrou uma vaga?</Text>
            <RadioButton.Group onValueChange={value => setFoundSpot(value)} value={foundSpot}>
                <View style={Styles.radioButtonContainer}>
                <RadioButton value="sim" color="#ec6408" />
                <Text style={Styles.radioButtonLabel}>Sim</Text>
                </View>
                <View style={Styles.radioButtonContainer}>
                <RadioButton value="nao" color="#ec6408" />
                <Text style={Styles.radioButtonLabel}>Não</Text>
                </View>
            </RadioButton.Group>
        </View>

        <View style={Styles.separator} />

        <View style={Styles.inputContainer}>
        <Text style={Styles.question}>Como você avalia sua experiência com o ParkingAI?</Text>

        <RadioButton.Group onValueChange={value => setRating(value)} value={rating}>
        <View style={Styles.radioButtonContainer}>
        <RadioButton value="muitoBoa" color="#ec6408" />
        <Text style={Styles.radioButtonLabel}>Muito boa</Text>
        <RadioButton value="boa" color="#ec6408" />
        <Text style={Styles.radioButtonLabel}>Boa</Text>
        </View>
        <View style={Styles.radioButtonContainer}>
        <RadioButton value="ruim" color="#ec6408" />
        <Text style={Styles.radioButtonLabel}>Ruim</Text>
        </View> 
        </RadioButton.Group>

        <TextInput
            label="Comentários"
            value={comments}
            onChangeText={setComments}
            multiline
            numberOfLines={4}
            style={Styles.textInput}
            mode='outlined'
            activeOutlineColor='#ec6408'
        />
        </View>

        <View style={Styles.separator} />

        <Button mode="contained" onPress={handleSubmit} style={Styles.defaultButton }>
            Enviar Avaliação
        </Button>
    </View>
  );
}
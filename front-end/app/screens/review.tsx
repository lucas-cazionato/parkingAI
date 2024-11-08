import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, RadioButton, TextInput } from 'react-native-paper';
import { Styles } from '../../constants/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { NavigationProp } from '@react-navigation/native';

type ReviewProps = {
  navigation: NavigationProp<any>;
};

export default function Review({ navigation }: ReviewProps) {
  const [foundSpot, setFoundSpot] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);;

  const handleSubmit = () => {
    console.log('Avaliação enviada:', { foundSpot, rating });
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

        <RadioButton.Group onValueChange={value => setRating(parseInt(value))} value={rating?.toString() || ''}>
        <View style={Styles.radioButtonContainer}>
        <RadioButton value="5" color="#ec6408" />
        <Text style={Styles.radioButtonLabel}>5</Text>
        <RadioButton value="4" color="#ec6408" />
        <Text style={Styles.radioButtonLabel}>4</Text>
        </View>
        <View style={Styles.radioButtonContainer}>
        <RadioButton value="3" color="#ec6408" />
        <Text style={Styles.radioButtonLabel}>3</Text>
        <RadioButton value="2" color="#ec6408" />
        <Text style={Styles.radioButtonLabel}>2</Text>
        <RadioButton value="1" color="#ec6408" />
        <Text style={Styles.radioButtonLabel}>1</Text>
        </View> 
        </RadioButton.Group>
        </View>

        <View style={Styles.separator} />

        <Button mode="contained" onPress={handleSubmit} style={Styles.defaultButton }>
            Enviar Avaliação
        </Button>
    </View>
  );
}
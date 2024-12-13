import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { Styles } from '../../constants/Styles';

type HelpProps = {
  navigation: NavigationProp<any>;
};

const Help: React.FC<HelpProps> = ({ navigation }) => {

  return (
    <ScrollView style={Styles.helpContainer} contentContainerStyle={Styles.contentContainer}>
      <View style={Styles.headerHelp}>
        <Text style={Styles.headerText}>Perguntas Frequentes</Text>
      </View>
      <List.Section>
        <Divider />
        <List.Accordion
          title="Como faço para criar uma conta?"
          titleStyle={{
            fontSize: 17,
          }}
          rippleColor="rgba(236, 100, 8, 0.3)"
          left={props => <List.Icon {...props} icon="account-plus" />}
        >
          <List.Item description="Para criar uma conta, clique em 'Registrar' na tela de login e preencha os campos necessários." />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Esqueci minha senha. O que devo fazer?"
          left={props => <List.Icon {...props} icon="lock-reset" />}
                    titleStyle={{
                      fontSize: 16,
                    }}
                    rippleColor="rgba(236, 100, 8, 0.3)"
        >
          <List.Item description="Clique em 'Esqueci minha senha' na tela de login e siga as instruções para redefinir sua senha." />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Como vou avaliar minha experiência?"
          left={props => <List.Icon {...props} icon="star" />}
                    titleStyle={{
                      fontSize: 17,
                    }}
                    rippleColor="rgba(236, 100, 8, 0.3)"
        >
          <List.Item description="Após usar o serviço, vá até a seção de avaliações e preencha o formulário de avaliação." />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Como contatar o suporte?"
          left={props => <List.Icon {...props} icon="email" />}
                    titleStyle={{
                      fontSize: 18,
                    }}
                    rippleColor="rgba(236, 100, 8, 0.3)"
        >
          <List.Item description="Para suporte adicional, envie um email para suporte@parkingai.com." />
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
};

export default Help;
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
          title="Como criar uma conta?"
          titleStyle={{
            fontSize: 16,
            color: '#05204b',
          }}
          rippleColor="hsla(29, 93.40%, 47.80%, 0.38)"
          style={Styles.accordion}
          left={props => <List.Icon {...props} icon="account-plus"color="#ec6408" />}
        >
        <Text style={Styles.descriptionText}>
          Para criar uma conta, clique em <Text style={Styles.highlight}>'Registrar'</Text> na tela de login e preencha os campos necessários.
        </Text>
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Esqueci minha senha. E agora?"
          titleStyle={{
            fontSize: 16,
            color: '#05204b',
          }}
          backgroundColor="#ffffff"
          rippleColor="rgba(236, 100, 8, 0.3)"
          style={Styles.accordion}
          left={props => <List.Icon {...props} icon="lock-reset" color="#ec6408"/>}
        >
          <Text style={Styles.descriptionText}>
           Clique em <Text style={Styles.highlight}>'Esqueci minha senha'</Text> na tela de login e siga as instruções para redefinir sua senha.
         </Text>
        </List.Accordion>
        <Divider />
        <List.Accordion
          title="Como avaliar minha experiência?"
          titleStyle={{
            fontSize: 16,
            color: '#05204b', // Cor personalizada
          }}
          rippleColor="rgba(236, 100, 8, 0.3)"
          style={Styles.accordion}
          left={props => <List.Icon {...props} icon="star" color="#ec6408"/>}
        >
          <Text style={Styles.descriptionText}>
             Após usar o serviço, vá até a seção de avaliações e preencha o formulário de avaliação.
          </Text>
        </List.Accordion>
        <Divider />
         <List.Accordion
              title="FALE CONOSCO"
              titleStyle={{
                fontSize: 16,
                color: '#05204b',
              }}
              rippleColor="rgba(236, 100, 8, 0.3)"
              style={Styles.accordion}
              left={(props) => <List.Icon {...props} icon="email" color="#ec6408" />}
            >
              <Text style={Styles.descriptionText}>
                Para suporte adicional, envie um email para <Text style={Styles.highlight}>suporte@parkingai.com</Text>.
              </Text>
            </List.Accordion>
            <Divider />
            <List.Accordion
              title="Como funciona a navegação?"
              titleStyle={{
                fontSize: 16,
                color: '#05204b',
              }}
              rippleColor="rgba(236, 100, 8, 0.3)"
              style={Styles.accordion}
              left={(props) => <List.Icon {...props} icon="map-marker-path" color="#ec6408" />}
            >
              <Text style={Styles.descriptionText}>
                A navegação é usada somente com o destino e a origem baseada em sua localização, com o objetivo de uso imediato para levá-lo à sua vaga.
              </Text>
            </List.Accordion>
            <Divider />
            <List.Accordion
              title="Como funciona a simulação?"
              titleStyle={{
                fontSize: 16,
                color: '#05204b',
              }}
              rippleColor="rgba(236, 100, 8, 0.3)"
              style={Styles.accordion}
              left={(props) => <List.Icon {...props} icon="clock" color="#ec6408" />}
            >
              <Text style={Styles.descriptionText}>
                A simulação é usada com o objetivo de simular uma rota em um horário diferente do atual para que possa fazer um planejamento prévio. É possível também especificar uma origem diferente da localização atual.
              </Text>
            </List.Accordion>
            <Divider />
        <List.Accordion
          title="FALE CONOSCO"
          titleStyle={{
            fontSize: 16,
            color: '#05204b',
          }}
          rippleColor="rgba(236, 100, 8, 0.3)"
          style={Styles.accordion}
          left={props => <List.Icon {...props} icon="email" color="#ec6408" />}
        >
          <Text style={Styles.descriptionText}>
               Para suporte adicional, envie um email para <Text style={Styles.highlight}>suporte@parkingai.com</Text>.
           </Text>
        </List.Accordion>
      </List.Section>



    </ScrollView>
  );
};

export default Help;
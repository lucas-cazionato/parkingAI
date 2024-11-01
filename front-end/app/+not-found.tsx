import { View, Text } from 'react-native';
import { Link } from 'expo-router';

const NotFound = () => {
  return (
    <View>
      <Text>Página não encontrada</Text>
      <Link href="/">Voltar para a página inicial</Link>
    </View>
  );
};

export default NotFound;
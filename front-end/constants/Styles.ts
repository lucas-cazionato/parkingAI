import { StyleSheet } from 'react-native';
import { Colors } from 'c:/Users/carol/Documents/parkingAI/front-end/constants/Colors';

export const Styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.light.background
      },
    image: {
        width: 250,
        height: 250,
        marginBottom: 40,
      },
      rememberMeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
      },
      appBar: {
        height: 60,
        backgroundColor: Colors.light.background,
        tintColor: Colors.white,
        paddingVertical: 48,
        alignItems: 'center',
        justifyContent: 'center',
      },

      cancelButton: {
        backgroundColor: '#e92c20',
      },
    
      defaultButton: {
        backgroundColor: '#ffffff',
      },
    
      button: {
        backgroundColor: '#05204b',
      },
    

    });
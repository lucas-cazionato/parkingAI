import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const Styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#05204b',
      },

      logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
      },

      inputContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
      },

      image: {
        width: 250,
        height: 250,
        marginBottom: 40,
      },

      logo: {
        width: 300, 
        height: 300, 
        resizeMode: 'contain',
      },

      rememberMeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      registerContainer: {
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

      registerText: {
        textAlign: 'center',
        color: '#ffffff',
        marginBottom: 20
      },

      forgetText: {
        textAlign: 'right',
        color: '#ffffff',
        marginBottom: 20
      },

      header: {
        fontSize: 20,
        color: '#11181C',
        padding: 10,
        textAlign: 'center',
        marginBottom: 20,
      },

      headerContainer: {
        marginBottom: 20,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
      },

      subText: {
        fontSize: 14,
        color: '#888888',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },

      input: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
      },

      cancelButton: {
        backgroundColor: '#e92c20',
      },
    
      defaultButton: {
        backgroundColor: '#ec6408',
      },
    
      button: {
        backgroundColor: '#05204b',
      },

      highlightText: {
        color: '#ec6408', // Texto laranja
      },
    

    });
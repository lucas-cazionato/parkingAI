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
    marginVertical: 40,
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
    fontSize: 22,
    color: '#11181C',
    padding: 10,
    textAlign: 'center',
    marginBottom: 20,
  },

  surface: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  subText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
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

  helperText: {
    marginTop: -8,
    marginBottom: 8,
  },

  question: {
    fontSize: 18,
    marginVertical: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    color: '#ec6408'
  },
  radioButtonLabel: {
    fontSize: 16,
  },
  textInput: {
    marginVertical: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff'
  },

  separator: {
    height: 20,
  },

  messageText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },

  drawerContent: {
    flex: 1,
    backgroundColor: '#05204b',
  },

  drawerItem: {
    color: '#ffffff',
  },

  drawerLabel: {
    color: '#ffffff',
  },

});
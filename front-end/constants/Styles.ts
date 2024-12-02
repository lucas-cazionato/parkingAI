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

  disabledButton: {
    backgroundColor: '#f0f0f0', // Cor cinza para botão desativado
    color: '#888888', // Texto mais opaco
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

  nonEditableInput: {
    backgroundColor: '#f0f0f0', // Fundo cinza claro
    color: '#888888', // Texto mais opaco
  },

  passwordContainer: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  passwordText: {
    fontSize: 14,
    color: '#555',
  },
  linkText: {
    color: '#ec6408',
    textDecorationLine: 'underline',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    alignItems: 'flex-end',
    marginLeft: 'auto',
    marginTop: 20
  },

  saveButton: {
    backgroundColor: '#ec6408',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  changePasswordButton: {
    borderColor: '#ec6408',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteAccountButton: {
    borderColor: '#ec6408',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 4,
  }




});
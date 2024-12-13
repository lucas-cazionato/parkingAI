import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const Styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#05204b',
  },

    contentContainer: {
      justifyContent: 'center',
      padding: 16,
    },

  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
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
    borderRadius: 50, // Deixa a borda arredondada
    overflow: 'hidden', // Garante que o conteúdo siga o contorno arredondado
    borderWidth: 3, // Para adicionar borda se necessário
    borderColor: '#ec6408', // Cor da borda (opcional)
    //clipPath: 'ellipse(70% 100% at 50% 50%)', // Formato de folha
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
    padding: 20,

  },

  subText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },

  travelContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "15%",
    padding: 5,
    alignItems: "center",
    zIndex: 2,
  },
  
  travelBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },
  
  travelText: {
    borderRadius: 8,
    fontSize: 14,
    color: '#ec6408',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
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

  overlay: {
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  simulateButton: {
    borderRadius: 50,
    position: "absolute",
    top: 12,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  clearButton: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
    position: "absolute",
    right: 4, // Posiciona o botão "X" no canto direito do campo
    top: 4,
    zIndex: 1,
  },
  inputMap: {
    backgroundColor: "white",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  marker: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  markerText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
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
  },

    contactButton: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#ec6408',
      borderRadius: 5,
      alignItems: 'center',
    },
    contactButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },

  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 60,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetText: {
    textAlign: 'right',
    color: '#ffffff',
  },

  headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.blue,
   },
  helpContainer: {
   flex: 1,
   backgroundColor: '#fff',
 },

  headerHelp: {
   alignItems: 'center',
   marginBottom: 16,
  },


});
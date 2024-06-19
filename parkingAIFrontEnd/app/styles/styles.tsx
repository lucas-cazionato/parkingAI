import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    overlayView: {
      backgroundColor: "white",
      borderColor: 'black',
      borderRadius: 8,
      borderWidth: 1,
      bottom: 300,
      position: "absolute",
      left: 40,
      width: "80%",  
    },
    contentText: {
      color: 'black',
      fontSize: 18,
    },
    input: {
      borderColor: 'black',
      borderRadius: 8,
      borderWidth: 1,
      paddingLeft: 10,
      fontSize: 18,
      width: "70%",
    },
    row: {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 20,
      marginRight: 5,
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pinkCircle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'pink',
      marginRight: 5,
    },
    greenCircle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'green',
      marginRight: 5,
    },
    overlayBtn: {
      backgroundColor: "#FFD700",
      borderColor: 'black',
      borderRadius: 8,
      borderWidth: 1,
      bottom: 50,
      position: "absolute",
      left: 150,
      width: 100,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      borderRadius: 8,
  },
});

export default styles;
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, { interpolateColor } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const ColorBar = () => {
  const steps = 11; // Valores de 0 a 1 com incrementos de 0.1
  const domain = [0, 0.5, 1]; // Faixa de interpolação
  const range = ["#00ff00", "#ffff00", "#ff0000"]; // Cores

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {Array.from({ length: steps }, (_, i) => {
          const value = i / (steps - 1); // Valor de 0 a 1

          // Interpolação de cores
          const fillColor = interpolateColor(
            value,
            domain,
            range
          );

          return (
            <Animated.View
              key={i}
              style={[
                styles.colorBox,
                {
                  backgroundColor: fillColor,
                },
              ]}
            />
          );
        })}
      </View>
      <Text style={styles.text}>Visualização de Interpolação de Cores</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  barContainer: {
    flexDirection: "row",
    width: width * 0.9, // Barra ocupa 90% da largura da tela
    height: 40,
    borderRadius: 5,
    overflow: "hidden",
  },
  colorBox: {
    flex: 1,
    height: "100%",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ColorBar;
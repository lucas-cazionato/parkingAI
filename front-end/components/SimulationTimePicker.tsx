import { Styles } from "@/constants";
import React, { useState } from "react";
import { View, Button, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from "react-native-paper";
import { format } from 'date-fns';

interface SimulationTimePickerProps {
  onDateTimeChange: (formattedDate: string) => void;
}

const SimulationTimePicker: React.FC<SimulationTimePickerProps> = ({ onDateTimeChange }) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const handleConfirm = (date: Date) => {
    setSelectedDateTime(date);
    // Formatar a data para o formato ISO 8601
    const formattedDate = date.toISOString().slice(0, 19); // Formato: "YYYY-MM-DDTHH:mm:ss"
    onDateTimeChange(formattedDate); // Passa a data formatada para o componente pai
    setIsPickerVisible(false);
  };

  return (
    <View style={Styles.simulationTimeBox}>
      <TouchableOpacity
        style={Styles.simulationTimeBox}  // Estilo do botão
        onPress={() => setIsPickerVisible(true)}
      >
        <Text style={Styles.simulationTimeText}> 
          {selectedDateTime ? format(selectedDateTime, 'dd/MM/yyyy HH:mm') : "Selecione data e hora"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"  // Seleciona tanto a data quanto a hora
        date={selectedDateTime || new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setIsPickerVisible(false)}
      />
    </View>
  );
};

export default SimulationTimePicker;
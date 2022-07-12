import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyInputText from "../../components/InputText";
import MySingleButton from "../../components/SingleButton";
import DropDownTratamientos from "../repuestos/GetTreatments";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterSupply = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [tratamientoId, setTratamientoId] = useState('');

  const clearData = () => {
    setNombre("");
    setCantidad("");
    setTratamientoId("");
  };

  const registerSupply = () => {
    console.log("states", nombre, cantidad, tratamientoId);
    // validaciones estados
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese nombre");
      return;
    }

    if (!cantidad.trim()) {
      Alert.alert("Ingrese cantidad");
      return;
    }

    if (!tratamientoId.trim()) {
      Alert.alert("Ingrese tratamiento");
      return;
    }

    // guardar los datos
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO supplies(nombre, cantidad, tratamiento_id) VALUES (?, ?, ?)`,
        [nombre, cantidad, tratamientoId],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Éxito",
              "Insumo registrado",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("SupplyHomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar Insumo");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre"
                onChangeText={setNombre}
                style={styles.input}
                value={nombre}
              />

              <MyInputText
                placeholder="Cantidad"
                onChangeText={setCantidad}
                keyboardType="number-pad"
                style={styles.input}
                value={cantidad}
              />

              <DropDownTratamientos
              onSelect={setTratamientoId}
              defaultButtonText={"Tratamiento"}
              />

              <MySingleButton
                title="Guardar Insumo"
                customPress={registerSupply}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterSupply;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    padding: 15,
    textAlignVertical: "top",
  }
});
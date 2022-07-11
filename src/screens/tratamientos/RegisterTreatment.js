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
import DropDownMatriculas from "../usuarios/GetMatriculas";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterTreatment = ({ navigation }) => {
  const [tratamiento_id, setTratamientoId] = useState('');
  const [nombre, setNombre] = useState('');
  const [auto, setAuto] = useState('');
  const [fecha_inicio, setFechaInicio] = useState('');
  const [fecha_fin, setFechaFin] = useState('');
  const [costo, setCosto] = useState('');

  const clearData = () => {
    setTratamientoId("");
    setNombre("");
    setAuto("");
    setFechaInicio("");
    setFechaFin("");
    setCosto("");
  };

  const registerTreatment = () => {
    console.log("states", tratamiento_id, nombre, auto, fecha_inicio, fecha_fin, costo);
    // validaciones estados
    debugger;
    if (!tratamiento_id.trim()) {
      Alert.alert("Ingrese id del tratamiento");
      return;
    }

    if (!nombre.trim()) {
      Alert.alert("Ingrese nombre");
      return;
    }

    if (!auto.trim()) {
      Alert.alert("Ingrese matricula");
      return;
    }

    if (!fecha_inicio.trim()) {
      Alert.alert("Ingrese fecha de inicio");
      return;
    }

    if (!fecha_fin.trim()) {
      Alert.alert("Ingrese fecha de fin");
      return;
    }

    if (!costo.trim()) {
      Alert.alert("Ingrese costo");
      return;
    }

    // guardar los datos
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO treatments (tratamiento_id, nombre, auto, fecha_inicio, fecha_fin, costo) VALUES (?, ?, ?, ?, ?, ?)`,
        [tratamiento_id, nombre, auto, fecha_inicio, fecha_fin, costo],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Éxito",
              "Tratamiento registrado",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("TreatmentHomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar tratamiento");
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
                placeholder="Código (Ej T-1234)"
                onChangeText={setTratamientoId}
                style={styles.input}
                value={tratamiento_id}
              />

              <MyInputText
                placeholder="Nombre"
                onChangeText={setNombre}
                style={styles.input}
                value={nombre}
              />

              <DropDownMatriculas
              onSelect={setAuto}
              defaultButtonText={"Matrícula"} />

              <MyInputText
                placeholder="Fecha de inicio (Ej. 01-01-2022)"
                onChangeText={setFechaInicio}
                keyboardType="number-pad"
                style={styles.input}
                value={fecha_inicio}
              />

              <MyInputText
                placeholder="Fecha de fin (Ej. 01-01-2022)"
                onChangeText={setFechaFin}
                keyboardType="number-pad"
                style={styles.input}
                value={fecha_fin}
              />

              <MyInputText
                placeholder="Costo"
                onChangeText={setCosto}
                keyboardType="number-pad"
                style={styles.input}
                value={costo}
              />

              <MySingleButton
                title="Guardar Tratamiento"
                customPress={registerTreatment}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterTreatment;

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
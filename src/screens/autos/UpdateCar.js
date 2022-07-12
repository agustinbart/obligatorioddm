import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyText from "../../components/Text";
import MyInputText from "../../components/InputText";
import MySingleButton from "../../components/SingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateCar = ({ navigation }) => {
  const [matriculaSearch, setMatriculaSearch] = useState("");
  const [matricula, setMatricula] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [motorserial, setMotorSerial] = useState("");

  const searchCar = () => {
    console.log("searchCar");

    if (!matriculaSearch.trim()) {
      Alert.alert("La cédula del usuario es requerida");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM cars WHERE matricula = ?",
        [matriculaSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setMatricula(results.rows.item(0).matricula);
            setMarca(results.rows.item(0).marca);
            setColor(results.rows.item(0).color);
            setMotorSerial(results.rows.item(0).motorserial);
          } else {
            Alert.alert("Auto no encontrado");
          }
        }
      );
    });
  };

  const updateCar = () => {
    console.log("updateCar");

    if (!matricula.trim() || !marca.trim() || !color.trim() || !motorserial.trim()) {
      Alert.alert("Faltan datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE cars SET matricula = ?, marca = ?, color = ?, motorserial = ? WHERE matricula = ?",
        [matricula, marca, color, motorserial, matriculaSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Auto actualizado");
            navigation.navigate("CarHomeScreen");
          } else {
            Alert.alert("No se pudo actualizar el auto");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardView}
            >
              <MyText text="Buscar Auto" style={styles.text}/>
              <MyInputText
                placeholder="Ingrese la Matrícula Ej. ABC 1234"
                style={styles.inputStyle}
                onChangeText={(text) => setMatriculaSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchCar} />

              <MyInputText
                placeholder="Ingrese la Matrícula Ej. ABC 1234"
                value={matricula}
                onChangeText={(text) => setMatricula(text)}
              />

              <MyInputText
                placeholder="Ingrese marca"
                value={marca}
                onChangeText={(text) => setMarca(text)}
              />

              <MyInputText
                placeholder="Ingrese color"
                value={color}
                onChangeText={(text) => setColor(text)}
              />

              <MyInputText
                placeholder="Ingrese serial de motor"
                value={motorserial}
                onChangeText={(text) => setMotorSerial(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateCar} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateCar;

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
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  inputStyle: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});

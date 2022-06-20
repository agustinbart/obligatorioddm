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

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterCar = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [motorserial, setMotorSerial] = useState('');

  const clearData = () => {
    setMatricula("");
    setMarca("");
    setColor("");
    setMotorSerial("");
  };

  const registerCar = () => {
    console.log("states", matricula, marca, color, motorserial);
    // validaciones estados
    debugger;
    if (!matricula.trim()) {
      Alert.alert("Ingrese matricula");
      return;
    }

    if (!marca.trim()) {
      Alert.alert("Ingrese marca");
      return;
    }

    if (!color.trim()) {
      Alert.alert("Ingrese color");
      return;
    }

    if (!motorserial.trim()) {
        Alert.alert("Ingrese serial de motor");
        return;
      }

    // guardar los datos
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO cars (matricula, marca, color, motorserial) VALUES (?, ?, ?, ?)`,
        [matricula, marca, color, motorserial],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Éxito",
              "Auto registrado",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("CarHomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar auto");
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
                placeholder="Matricula"
                onChangeText={setMatricula}
                style={styles.input}
                value={matricula}
              />

              <MyInputText
                placeholder="Marca"
                onChangeText={setMarca}
                style={styles.input}
                value={marca}
              />

              <MyInputText
                placeholder="Color"
                onChangeText={setColor}
                style={styles.input}
                value={color}
              />

              <MyInputText
                placeholder="Serial de motor"
                onChangeText={setMotorSerial}
                style={styles.input}
                value={motorserial}
              />

              <MySingleButton
                title="Guardar Auto"
                customPress={registerCar}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCar;

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
import React, { useState, useEffect } from "react";
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
import DropDownMatriculas from "./GetMatriculasNoAsignadas";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [matricula, setMatricula] = useState('');

  const cedulaRegex = /\b[1-9]{1}.[0-9]{3}.[0-9]{3}-[0-9]{1}\b/;

  const clearData = () => {
    setNombre("");
    setApellido("");
    setCedula("");
    setMatricula("");
  };

  const registerUser = () => {
    console.log("states", nombre, apellido, cedula, matricula);
    // validaciones estados
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese su nombre de usuario");
      return;
    }

    if (!apellido.trim()) {
      Alert.alert("Ingrese su contraseña");
      return;
    }

    if (!cedulaRegex.test(cedula)) {
      Alert.alert("Cédula inválida");
      return;
    }

    if (!matricula.trim()) {
        Alert.alert("Ingrese su matricula");
        return;
      }

    // guardar los datos
    db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO users (nombre, apellido, cedula, matricula) VALUES (?, ?, ?, ?)`,
            [nombre, apellido, cedula, matricula],
            (tx, results) => {
              console.log("results", results);
              // validar resultado
              if (results.rowsAffected > 0) {
                clearData();
                Alert.alert(
                  "Éxito",
                  "Usuario registrado",
                  [
                    {
                      text: "Ok",
                      onPress: () => navigation.navigate("UserHomeScreen"),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                Alert.alert("Error al registrar usuario");
              }
            }
          ); 
        }, []);
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
                placeholder="Apellido"
                onChangeText={setApellido}
                style={styles.input}
                value={apellido}
              />

              <MyInputText
                placeholder="Cédula Ej.(1.234.567-8)"
                onChangeText={setCedula}
                style={styles.input}
                keyboardType="number-pad"
                value={cedula}
              />

              <DropDownMatriculas
              onSelect={setMatricula}
              defaultButtonText={"Matricula"}
              />

              <MySingleButton
                title="Guardar Usuario"
                customPress={registerUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;

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
    flex: 1,
    padding: 15,
    textAlignVertical: "top",
  }
});
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
import DropDownMatriculas from "./GetMatriculas";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateUser = ({navigation}) => {
  const [cedulaSearch, setCedulaSearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [matricula, setMatricula] = useState("");

  const cedulaRegex = /\b[1-9]{1}.[0-9]{3}.[0-9]{3}-[0-9]{1}\b/;

  const searchUser = () => {
    console.log("searchUser");

    if (!cedulaSearch.trim()) {
      Alert.alert("La cédula del usuario es requerida");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE cedula = ?",
        [cedulaSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).nombre);
            setApellido(results.rows.item(0).apellido);
            setCedula(results.rows.item(0).cedula);
            setMatricula(results.rows.item(0).matricula);
          } else {
            Alert.alert("Usuario no encontrado");
          }
        }
      );
    });
  };

  const updateUser = () => {
    console.log("updateUser");

    if (!nombre.trim() || !apellido.trim() || !matricula.trim()) {
      Alert.alert("Faltan datos");
      return;
    }

    if (!cedulaRegex.test(cedula)) {
      Alert.alert("Cédula inválida");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET nombre = ?, apellido = ?, cedula = ?, matricula = ? WHERE cedula = ?",
        [nombre, apellido, cedula, matricula, cedulaSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Usuario actualizado");
            navigation.navigate("UserHomeScreen");
          } else {
            Alert.alert("No se pudo actualizar el usuario");
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
              <MyText text="Buscar Usuario" style={styles.text}/>
              <MyInputText
                placeholder="Ingrese la cédula Ej.(1.234.567-8)"
                style={styles.inputStyle}
                keyboardType="number-pad"
                onChangeText={(text) => setCedulaSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchUser} />

              <MyInputText
                placeholder="Ingrese el nombre de Usuario"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />

              <MyInputText
                placeholder="Ingrese el apellido"
                value={apellido}
                onChangeText={(text) => setApellido(text)}
              />

              <MyInputText
                placeholder="Ingrese la Cédula Ej.(1.234.567-8)"
                value={cedula}
                keyboardType="number-pad"
                onChangeText={(text) => setCedula(text)}
              />

              <MyInputText
                placeholder="Matrícula"
                value={matricula}
                selectTextOnFocus={false}
                editable={false}
              />

              <MySingleButton title="Actualizar" customPress={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

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

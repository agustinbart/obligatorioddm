import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyInputText from "../../components/InputText";
import MySingleButton from "../../components/SingleButton";
import MyText from "../../components/Text";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteUser = ({ navigation }) => {
  const [cedula, setCedula] = useState("");

  const deleteUser = () => {
    console.log("deleteUser");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM users WHERE cedula = ?`,
        [cedula],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Usuario eliminado");
            navigation.navigate("UserHomeScreen");
          } else {
            Alert.alert("El usuario no existe");
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
          <MyText text="Busqueda de usuario" style={styles.text}/>
            <KeyboardAvoidingView style={styles.keyboardView}>
          <MyInputText
            style={styles.inputStyle}
            placeholder="Cédula Ej.(1.234.567-8)"
            keyboardType="number-pad"
            onChangeText={(text) => setCedula(text)}
          />
          <MySingleButton title="Borrar Usuario" customPress={deleteUser} />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;

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
  inputStyle: {
    padding: 15,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
});
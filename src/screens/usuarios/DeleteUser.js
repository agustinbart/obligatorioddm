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
  const [nombre, setNombre] = useState("");

  const deleteUser = ({ navigation }) => {
    console.log("deleteUser");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM users WHERE nombre = ?`,
        [nombre],
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
            placeholder="Nombre de usuario"
            onChangeText={(text) => setNombre(text)}
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
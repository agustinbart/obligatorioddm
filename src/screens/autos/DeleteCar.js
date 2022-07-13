import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MySingleButton from "../../components/SingleButton";
import MyText from "../../components/Text";
import DropDownMatriculasNA from "../usuarios/GetMatriculasNoAsignadas";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteCar = ({ navigation }) => {
  const [matricula, setMatricula] = useState("");

  const deleteCar = () => { // Borramos de la base de datos los registros con la matrícula ingresada.
    console.log("deleteMatricula");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM cars WHERE matricula = ?`,
        [matricula],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Auto eliminado");
            navigation.navigate("CarHomeScreen");
          } else {
            Alert.alert("El auto no existe");
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
          <MyText text="Busqueda de auto" style={styles.text}/>
            <KeyboardAvoidingView style={styles.keyboardView}>
              
            <DropDownMatriculasNA
              onSelect={setMatricula}
              defaultButtonText={"Matricula"}
              />

          <MyText style={styles.text} text="*Los vehículos que no aparecen es porque están asignados a un cliente y/o reparación*"/>
          <MySingleButton title="Borrar Auto" customPress={deleteCar} />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteCar;

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
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
import DropDownTratamientos from "./GetTreatments";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteReplacement = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [tratamientoId, setTratamientoId] = useState("");

  const deleteReplacement = () => {
    console.log("deleteReplacement");
    db.transaction((tx) => { // Borramos el registro que coincida con el nombre e id de tratamiento ingresados.
      tx.executeSql(
        `DELETE FROM replacements WHERE nombre = ? AND tratamiento_id = ?`,
        [nombre, tratamientoId],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto eliminado");
            navigation.navigate("ReplacementHomeScreen");
          } else {
            Alert.alert("El repuesto no existe");
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
          <MyText text="Busqueda de repuesto" style={styles.text}/>
            <KeyboardAvoidingView style={styles.keyboardView}>
            <MyInputText
                style={styles.inputStyle}
                placeholder="Nombre"
                onChangeText={(text) => setNombre(text)}
              />

              <DropDownTratamientos
              onSelect={setTratamientoId}
              defaultButtonText={"Tratamiento"}
              />
          <MySingleButton title="Borrar Repuesto" customPress={deleteReplacement} />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteReplacement;

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
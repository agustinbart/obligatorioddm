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
import DropDownTratamientos from "../repuestos/GetTreatments";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteSupply = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [tratamientoId, setTratamientoId] = useState("");

  const deleteSupply = () => { // Borramos de la base de datos el registro con el nombre e id de tratamiento ingresados.
    console.log("deleteSupply");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM supplies WHERE nombre = ? AND tratamiento_id = ?`,
        [nombre, tratamientoId],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Insumo eliminado");
            navigation.navigate("SupplyHomeScreen");
          } else {
            Alert.alert("El insumo no existe");
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
          <MySingleButton title="Borrar Insumo" customPress={deleteSupply} />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteSupply;

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
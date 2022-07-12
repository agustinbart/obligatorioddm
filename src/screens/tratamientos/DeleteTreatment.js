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
import DropDownTreatmentsNA from "./GetTreatmentsNoAsignados";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteTreatment = ({ navigation }) => {
  const [tratamiento_id, setTratamientoId] = useState(0);

  const deleteTreatment = () => {
    console.log("deleteTreatment");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM treatments WHERE tratamiento_id = ?`,
        [tratamiento_id],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento eliminado");
            navigation.navigate("TreatmentHomeScreen");
          } else {
            Alert.alert("El tratamiento no existe");
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
          <MyText text="Busqueda de tratamiento" style={styles.text}/>
            <KeyboardAvoidingView style={styles.keyboardView}>
            <DropDownTreatmentsNA
              onSelect={setTratamientoId}
              defaultButtonText={"Tratamiento"}
              />
          <MyText style={styles.text} text="*Los tratamientos que no aparecen es porque tiene asignados repuestos y/o insumos*"/>
          <MySingleButton title="Borrar Tratamiento" customPress={deleteTreatment} />
          </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteTreatment;

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
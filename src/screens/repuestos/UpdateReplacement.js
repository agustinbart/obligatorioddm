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
import DropDownTratamientos from "./GetTreatments";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateReplacement = ({navigation}) => {
  const [nombreSearch, setNombreSearch] = useState("");
  const [tratamientoSearch, setTratamientoSearch] = useState("");
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [tratamientoId, setTratamientoId] = useState('');

  const searchReplacement = () => {
    console.log("searchReplacement");

    if (!nombreSearch.trim()) {
      Alert.alert("El nombre del repuesto es requerido");
      return;
    }

    if (!tratamientoSearch.trim()) {
        Alert.alert("El tratamiento es requerido");
        return;
      }

    db.transaction((tx) => {
      tx.executeSql( // Seleccionamos el registro que coincida con el nombre e id de tratamiento ingresados.
        "SELECT * FROM replacements WHERE nombre = ? AND tratamiento_id = ?",
        [nombreSearch, tratamientoSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).nombre);
            setCantidad(results.rows.item(0).cantidad.toString());
          } else {
            Alert.alert("Repuesto no encontrado");
          }
        }
      );
    });
  };

  const updateReplacement = () => {
    console.log("updateReplacement");

    if (!nombre.trim() || !cantidad.trim() || !tratamientoId.trim()) {
      Alert.alert("Faltan datos");
      return;
    }

    db.transaction((tx) => { // Actualizamos el registro que coincida con el nombre e id de tratamiento ingresados.
      tx.executeSql(
        "UPDATE replacements SET nombre = ?, cantidad = ?, tratamiento_id = ? WHERE nombre = ? AND tratamiento_id = ?",
        [nombre, cantidad, tratamientoId, nombreSearch, tratamientoSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto actualizado");
            navigation.navigate("ReplacementHomeScreen");
          } else {
            Alert.alert("No se pudo actualizar el repuesto");
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
              <MyText text="Buscar Repuesto" style={styles.text}/>
              <MyInputText
                placeholder="Nombre de repuesto"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreSearch(text)}
              />

              <DropDownTratamientos
              onSelect={setTratamientoSearch}
              defaultButtonText={"Tratamiento"}
              />
              <MySingleButton title="Buscar" customPress={searchReplacement} />

              <MyInputText
                placeholder="Nombre"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />

              <MyInputText
                placeholder="Cantidad"
                value={cantidad}
                keyboardType="number-pad"
                onChangeText={(text) => setCantidad(text)}
              />

              <DropDownTratamientos
              onSelect={setTratamientoId}
              defaultButtonText={"Tratamiento"}
              defaultValue={tratamientoSearch}
              />

              <MySingleButton title="Actualizar" customPress={updateReplacement} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateReplacement;

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
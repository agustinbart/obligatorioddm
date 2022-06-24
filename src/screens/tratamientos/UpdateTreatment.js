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
import DropDownMatriculas from "../usuarios/GetMatriculas";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateTreatment = ({ navigation }) => {
    const [treatmentSearch, setTreatmentSearch] = useState('');
    const [nombre, setNombre] = useState('');
    const [auto, setAuto] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');
    const [costo, setCosto] = useState(0);

  const searchTreatment = () => {
    console.log("searchTreatment");

    if (!treatmentSearch.trim()) {
      Alert.alert("El id del tratamiento es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM treatments WHERE tratamiento_id = ?",
        [treatmentSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).nombre);
            setAuto(results.rows.item(0).auto);
            setFechaInicio(results.rows.item(0).fecha_inicio);
            setFechaFin(results.rows.item(0).fecha_fin);
            setCosto(results.rows.item(0).costo);
          } else {
            Alert.alert("Tratamiento no encontrado");
          }
        }
      );
    });
  };

  const updateTreatment = () => {
    console.log("updateTreatment");

    if (!nombre.trim() || !auto.trim() || !fecha_inicio.trim() || !fecha_fin.trim()) {
      Alert.alert("Faltan datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE treatments SET nombre = ?, auto = ?, fecha_inicio = ?, fecha_fin = ?, costo = ? WHERE tratamiento_id = ?",
        [nombre, auto, fecha_inicio, fecha_fin, costo, treatmentSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento actualizado");
            navigation.navigate("TreatmentHomeScreen");
          } else {
            Alert.alert("No se pudo actualizar el tratamiento");
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
              <MyText text="Buscar Tratamiento" style={styles.text}/>
              <MyInputText
                placeholder="Ingrese el id"
                style={styles.inputStyle}
                onChangeText={(text) => setTreatmentSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchTreatment} />

              <MyInputText
                placeholder="Ingrese nombre"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />

              <DropDownMatriculas
                defaultValue={auto}
                onSelect={(text) => setAuto(text)}
                defaultButtonText={"Matricula"}
              />

              <MyInputText
                placeholder="Ingrese fecha de inicio"
                value={fecha_inicio}
                onChangeText={(text) => setFechaInicio(text)}
              />

              <MyInputText
                placeholder="Ingrese fecha de fin"
                value={fecha_fin}
                onChangeText={(text) => setFechaFin(text)}
              />

            <MyInputText
                placeholder="Ingrese costo"
                value={costo}
                keyboardType="number-pad"
                onChangeText={(text) => setCosto(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateTreatment} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateTreatment;

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

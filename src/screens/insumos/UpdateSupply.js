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
import DropDownTratamientos from "../repuestos/GetTreatments";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateSupply = ({navigation}) => {
  const [nombreSearch, setNombreSearch] = useState("");
  const [tratamientoSearch, setTratamientoSearch] = useState("");
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [tratamientoId, setTratamientoId] = useState('');

  const searchSupply = () => {
    console.log("searchSupply");

    if (!nombreSearch.trim()) {
      Alert.alert("El nombre del insumo es requerido");
      return;
    }

    if (!tratamientoSearch.trim()) {
        Alert.alert("El tratamiento es requerido");
        return;
      }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM supplies WHERE nombre = ? AND tratamiento_id = ?",
        [nombreSearch, tratamientoSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).nombre);
            setCantidad(results.rows.item(0).cantidad.toString());
          } else {
            Alert.alert("Insumo no encontrado");
          }
        }
      );
    });
  };

  const updateSupply = () => {
    console.log("updateSupply");

    if (!nombre.trim() || !cantidad.trim() || !tratamientoId.trim()) {
      Alert.alert("Faltan datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE supplies SET nombre = ?, cantidad = ?, tratamiento_id = ? WHERE nombre = ? AND tratamiento_id = ?",
        [nombre, cantidad, tratamientoId, nombreSearch, tratamientoSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Insumo actualizado");
            navigation.navigate("SupplyHomeScreen");
          } else {
            Alert.alert("No se pudo actualizar el insumo");
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
              <MyText text="Buscar Insumo" style={styles.text}/>
              <MyInputText
                placeholder="Nombre de Insumo"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreSearch(text)}
              />

              <DropDownTratamientos
              onSelect={setTratamientoSearch}
              defaultButtonText={"Tratamiento"}
              />
              <MySingleButton title="Buscar" customPress={searchSupply} />

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

              <MySingleButton title="Actualizar" customPress={updateSupply} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateSupply;

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
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyText from "../../components/Text";
import MyInputText from "../../components/InputText";
import MySingleButton from "../../components/SingleButton";
import DropDownTratamientos from "../repuestos/GetTreatments";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewSupply = ({ navigation }) => {
  const [nombreSearch, setNombreSearch] = useState("");
  const [tratamientoSearch, setTratamientoSearch] = useState("");
  const [SupplyData, setSupplyData] = useState(null);

  // generar funcion para obtener datos del usuario
  const getSupplyData = () => {
    console.log("getSupplyData");
    setSupplyData({});

    if (!nombreSearch.trim() || !tratamientoSearch.trim()) {
      Alert.alert("Faltan datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM supplies WHERE nombre = ? AND tratamiento_id = ?`,
        [nombreSearch, tratamientoSearch],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rows.length > 0) {
            setSupplyData(results.rows.item(0));
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
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Filtro de insumos" style={styles.text}/>
              <MyInputText
                style={styles.inputStyle}
                placeholder="Nombre"
                onChangeText={(text) => setNombreSearch(text)}
              />

              <DropDownTratamientos
              onSelect={setTratamientoSearch}
              defaultButtonText={"Tratamiento"}
              />
              <MySingleButton title="Buscar" customPress={getSupplyData} />
              <View style={styles.presenterView}>
                <MyText text={`${!SupplyData ? '' : "Cantidad: " + SupplyData.cantidad}`} style={styles.presenterText}/>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewSupply;

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
    margin: 10,
    color: "black",
  },
  presenterView: {
    flex:2,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    fontSize: 30,
  },
  presenterText: {
    fontSize:20
  }
});

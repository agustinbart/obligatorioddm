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
import DropDownTratamientos from "./GetTreatments";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewReplacement = ({ navigation }) => {
  const [nombreSearch, setNombreSearch] = useState("");
  const [tratamientoSearch, setTratamientoSearch] = useState("");
  const [replacementData, setReplacementData] = useState(null);

  // Generar funcion para obtener datos del repuesto
  const getReplacementData = () => {
    console.log("getReplacementData");
    setReplacementData({});

    if (!nombreSearch.trim() || !tratamientoSearch.trim()) {
      Alert.alert("Faltan datos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM replacements WHERE nombre = ? AND tratamiento_id = ?`,
        [nombreSearch, tratamientoSearch],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rows.length > 0) {
            setReplacementData(results.rows.item(0));
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
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Filtro de repuestos" style={styles.text}/>
              <MyInputText
                style={styles.inputStyle}
                placeholder="Nombre"
                onChangeText={(text) => setNombreSearch(text)}
              />

              <DropDownTratamientos
              onSelect={setTratamientoSearch}
              defaultButtonText={"Tratamiento"}
              />
              <MySingleButton title="Buscar" customPress={getReplacementData} />
              <View style={styles.presenterView}>
                <MyText text={`${!replacementData ? '' : "Cantidad: " + replacementData.cantidad}`} style={styles.presenterText}/>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewReplacement;

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

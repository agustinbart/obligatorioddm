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

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewCar = ({ navigation }) => {
  const [id, setTratamientoId] = useState("");
  const [tratamientoData, setTratamientoData] = useState(null);

  // generar funcion para obtener datos del usuario
  const getTratamientoData = () => {
    console.log("getTratamientoData");
    setTratamientoData({});

    if (!id.trim()) {
      Alert.alert("El id es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM treatments WHERE tratamiento_id = ?`,
        [id],
        (tx, results) => {
          console.log("results", results);
          // validar resultado
          if (results.rows.length > 0) {
            setTratamientoData(results.rows.item(0));
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
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Filtro de tratamiento" style={styles.text}/>
              <MyInputText
                style={styles.inputStyle}
                placeholder="Id"
                onChangeText={(text) => setTratamientoId(text)}
              />
              <MySingleButton title="Buscar" customPress={getTratamientoData} />
              <View style={styles.presenterView}>
                <MyText text={`${!tratamientoData ? '' : tratamientoData.nombre}`} style={styles.presenterText}/>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewCar;

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

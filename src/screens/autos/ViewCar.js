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
  const [matricula, setMatricula] = useState("");
  const [carData, setCarData] = useState(null);

  // Generar funcion para obtener datos del auto
  const getCarData = () => {
    console.log("getCarData");
    setCarData({});

    if (!matricula.trim()) {
      Alert.alert("La matricula es requerida");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM cars WHERE matricula = ?`,
        [matricula],
        (tx, results) => {
          console.log("results", results);
          // Validar resultado
          if (results.rows.length > 0) {
            setCarData(results.rows.item(0));
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
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Filtro de auto" style={styles.text}/>
              <MyInputText
                style={styles.inputStyle}
                placeholder="Ingrese la Matrícula Ej. ABC 1234"
                onChangeText={(text) => setMatricula(text)}
              />
              <MySingleButton title="Buscar" customPress={getCarData} />
              <View style={styles.presenterView}>
                <MyText text={`${!carData ? '' : carData.marca}`} style={styles.presenterText}/>
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

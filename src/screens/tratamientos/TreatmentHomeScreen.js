import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/Button";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const TreatmentHomeScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='treatments'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS treatments', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS treatments(tratamiento_id VARCHAR(10) PRIMARY KEY, nombre VARCHAR(20), auto VARCHAR(8), fecha_inicio VARCHAR(10), fecha_fin VARCHAR(10), costo VARCHAR(10))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM treatments', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Tratamiento"
                btnColor="green"
                btnIcon="plus"
                customPress={() => navigation.navigate("RegisterTreatment")}
              />

              <MyButton
                title="Actualizar Tratamiento"
                btnColor="red"
                btnIcon="car-alt"
                customPress={() => navigation.navigate("UpdateTreatment")}
              />

              <MyButton
                title="Ver Tratamiento"
                btnColor="blue"
                btnIcon="eye"
                customPress={() => navigation.navigate("ViewTreatment")}
              />

              <MyButton
                title="Borrar Tratamiento"
                btnColor="brown"
                btnIcon="eraser"
                customPress={() => navigation.navigate("DeleteTreatment")}
              />

              <MyButton
                title="Ver todos los Tratamientos"
                btnColor="purple"
                btnIcon="eye"
                customPress={() => navigation.navigate("ViewAllTreatments")}
              />
              
              <MyButton
                title="Borrar registros"
                btnColor="red"
                btnIcon="eraser"
                customPress={() => removeElementsOnDatabase()}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TreatmentHomeScreen;

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
    justifyContent: "center",
  },
});
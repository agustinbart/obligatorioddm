import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/Button";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ReplacementHomeScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='replacements'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS replacements', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS replacements(repuestocod INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(30), cantidad INT, tratamiento_id VARCHAR(10))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM replacements', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Repuesto"
                btnColor="#44BBA4"
                btnIcon="plus"
                customPress={() => navigation.navigate("RegisterReplacement")}
              />

              <MyButton
                title="Actualizar Repuesto"
                btnColor="#44BBA4"
                btnIcon="car-alt"
                customPress={() => navigation.navigate("UpdateReplacement")}
              />

              <MyButton
                title="Ver Repuesto"
                btnColor="#44BBA4"
                btnIcon="eye"
                customPress={() => navigation.navigate("ViewReplacement")}
              />

              <MyButton
                title="Borrar Repuesto"
                btnColor="#44BBA4"
                btnIcon="eraser"
                customPress={() => navigation.navigate("DeleteReplacement")}
              />

              <MyButton
                title="Ver todos los Repuestos"
                btnColor="#44BBA4"
                btnIcon="eye"
                customPress={() => navigation.navigate("ViewAllReplacements")}
              />
              
              <MyButton
                title="Borrar registros"
                btnColor="#44BBA4"
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

export default ReplacementHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "#2A363B",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
});
import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/Button";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const SupplyHomeScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='supplies'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS supplies', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS supplies(insumo_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(30), cantidad INT, tratamiento_id VARCHAR(10))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM supplies', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Insumo"
                btnColor="#44BBA4"
                btnIcon="plus"
                customPress={() => navigation.navigate("RegisterSupply")}
              />

              <MyButton
                title="Actualizar Insumo"
                btnColor="#44BBA4"
                btnIcon="car-alt"
                customPress={() => navigation.navigate("UpdateSupply")}
              />

              <MyButton
                title="Ver Insumo"
                btnColor="#44BBA4"
                btnIcon="eye"
                customPress={() => navigation.navigate("ViewSupply")}
              />

              <MyButton
                title="Borrar Insumo"
                btnColor="#44BBA4"
                btnIcon="eraser"
                customPress={() => navigation.navigate("DeleteSupply")}
              />

              <MyButton
                title="Ver todos los Insumos"
                btnColor="#44BBA4"
                btnIcon="eye"
                customPress={() => navigation.navigate("ViewAllSupplies")}
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

export default SupplyHomeScreen;

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
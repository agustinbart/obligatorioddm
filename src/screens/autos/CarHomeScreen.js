import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/Button";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const CarHomeScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => { // Creación base de datos.
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='cars'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS cars', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS cars(auto_id INTEGER PRIMARY KEY AUTOINCREMENT, matricula VARCHAR(8), marca VARCHAR(20), color VARCHAR(16), motorserial VARCHAR(30))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => { // Eliminar registros de la base de datos.
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM cars', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Auto"
                btnColor="#44BBA4"
                btnIcon="plus"
                customPress={() => navigation.navigate("RegisterCar")}
              />

              <MyButton
                title="Actualizar Auto"
                btnColor="#44BBA4"
                btnIcon="car-alt"
                customPress={() => navigation.navigate("UpdateCar")}
              />

              <MyButton
                title="Ver Auto"
                btnColor="#44BBA4"
                btnIcon="eye"
                customPress={() => navigation.navigate("ViewCar")}
              />

              <MyButton
                title="Borrar Auto"
                btnColor="#44BBA4"
                btnIcon="eraser"
                customPress={() => navigation.navigate("DeleteCar")}
              />

              <MyButton
                title="Ver todos los Autos"
                btnColor="#44BBA4"
                btnIcon="eye"
                customPress={() => navigation.navigate("ViewAllCars")}
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

export default CarHomeScreen;

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
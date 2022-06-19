import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/Button";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UserHomeScreen = ({ navigation }) => {

  useEffect(() => {
    db.transaction( (txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        [],
         (tx, res) =>{
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS users', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20), apellido VARCHAR(20), cedula VARCHAR(8), matricula VARCHAR(8))',
              []
            );
          }
        }
      );
    });
  }, []);

  const removeElementsOnDatabase = () => {
    db.transaction( (txn) => {
      txn.executeSql('DELETE FROM users', []);
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Usuarios"
                btnColor="green"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("RegisterUser")}
              />

              <MyButton
                title="Actualizar Usuario"
                btnColor="red"
                btnIcon="user-circle"
                customPress={() => navigation.navigate("UpdateUser")}
              />

              <MyButton
                title="Ver Usuario"
                btnColor="blue"
                btnIcon="users"
                customPress={() => navigation.navigate("ViewUser")}
              />

              <MyButton
                title="Borrar Usuario"
                btnColor="brown"
                btnIcon="user-times"
                customPress={() => navigation.navigate("DeleteUser")}
              />

              <MyButton
                title="Ver todos los Usuarios"
                btnColor="purple"
                btnIcon="user-times"
                customPress={() => navigation.navigate("ViewAllUsers")}
              />
              
              <MyButton
                title="Borrar DB"
                btnColor="red"
                btnIcon="remove"
                customPress={() => removeElementsOnDatabase()}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserHomeScreen;

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


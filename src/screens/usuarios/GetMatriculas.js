import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, CameraRoll } from "react-native";
import MyText from "../../components/Text";
import SelectDropdown from "react-native-select-dropdown";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DropDownMatriculas = (props) => {
  const [cars, setCars] = useState([]);

  // Ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM cars`, [], (tx, results) => { // Seleccionamos todos los datos de la tabla 'cars'.
        console.log("results", results);
        // Validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setCars(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay autos!",
            [
              {
                text: "Ok"
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);


  return (
    <SafeAreaView style={styles.container}>
        <View>
            <SelectDropdown
                data={cars.map(car => car.matricula)} // Filtramos el array 'cars' para que solo queden las matrículas.
                onSelect={props.onSelect}
                defaultButtonText={props.defaultButtonText}
                buttonStyle={styles.select}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                />
        </View>
    </SafeAreaView>
  );
};

export default DropDownMatriculas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  select: {
    flex: 1,
    alignSelf: "center",
    width: 335,
  }
});
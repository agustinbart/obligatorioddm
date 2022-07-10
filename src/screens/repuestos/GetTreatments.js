import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, CameraRoll } from "react-native";
import MyText from "../../components/Text";
import SelectDropdown from "react-native-select-dropdown";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DropDownTratamientos = (props) => {
  const [treatments, setTreatments] = useState([]);

  // ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM treatments`, [], (tx, results) => {
        console.log("results", results);
        // validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setTreatments(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay tratamientos!",
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
                data={treatments.map(treatments => treatments.tratamiento_id)}
                onSelect={props.onSelect}
                defaultButtonText={props.defaultButtonText}
                buttonStyle={styles.select}
                defaultValue={props.defaultValue}
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

export default DropDownTratamientos;

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
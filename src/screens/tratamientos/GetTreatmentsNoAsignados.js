import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, CameraRoll } from "react-native";
import MyText from "../../components/Text";
import SelectDropdown from "react-native-select-dropdown";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DropDownTreatmentsNA = (props) => {
  const [trat, setTrat] = useState([]);

  useEffect(() => {
    db.transaction((tx) => { // Seleccionamos los tratamientos que NO ESTEN en ningún registro de la tabla 'replacements' y 'supplies'.
      tx.executeSql(`SELECT t.tratamiento_id FROM treatments t WHERE t.tratamiento_id NOT IN (SELECT r.tratamiento_id FROM replacements r) 
                    AND t.tratamiento_id NOT IN(SELECT s.tratamiento_id FROM supplies s)`, [], (tx, results) => {
        console.log("results", results);
        // Validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setTrat(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay usuarios!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("UserHomeScreen"),
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
          data={trat.map(trats => trats.tratamiento_id)}
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

export default DropDownTreatmentsNA;

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
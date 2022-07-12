import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert, CameraRoll } from "react-native";
import MyText from "../../components/Text";
import SelectDropdown from "react-native-select-dropdown";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DropDownMatriculasNA = (props) => {
    const [mat, setMat] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(`SELECT c.matricula FROM cars c WHERE c.matricula NOT IN (SELECT u.matricula FROM users u)`, [], (tx, results) => {
            console.log("results", results);
            // validar resultado
            if (results.rows.length > 0) {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setMat(temp);
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
                data={mat.map(mats => mats.matricula)}
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

export default DropDownMatriculasNA;

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
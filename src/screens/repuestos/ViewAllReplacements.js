import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/Text";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllReplacements = ({navigation}) => {
  const [replacements, setReplacements] = useState([]);

  // Ejecutar cuando la vista se cree
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM replacements`, [], (tx, results) => {
        console.log("results", results);
        // Validar resultado
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setReplacements(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay repuestos!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("ReplacementHomeScreen"),
              },
            ],
            { cancelable: false }
          );
        }
      });
    });
  }, []);

  const listItemView = (item) => { // Lista de elementos a mostrar.
    return (
      <View key={item.id} style={styles.listItemView}>
        <MyText text={item.nombre} style={styles.text}/>
        <MyText text={item.cantidad} style={styles.text}/>
        <MyText text={item.tratamiento_id} style={styles.text}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={replacements}
            key={(index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllReplacements;

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
  listView: {
    marginTop: 20,
  },
  listItemView: {
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    padding: 5,
    marginLeft: 10,
    color: "black",
    alignContent: "center",
    alignItems: "center",
  }
});
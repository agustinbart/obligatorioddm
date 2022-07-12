import { StyleSheet, ScrollView, View, SafeAreaView, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import MyText from "../../components/Text";
import DatabaseConnection from '../../database/database-connection';
const db = DatabaseConnection.getConnection();

const Consulta1 = () => {
    const [Si, setSi] = useState([]);
    const [No, setNo] = useState([]);
    const Final = [].concat(Si,No);

      useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT u.nombre, t.auto, t.tratamiento_id, t.fecha_inicio, t.costo, 'Si' As [repuesto]
                           FROM users u, treatments t
                           WHERE u.matricula = t.auto and t.tratamiento_id IN (SELECT DISTINCT tratamiento_id FROM replacements)`, [], (tx, results) => {
              console.log("results", results);
              if (results.rows.length > 0) {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                  temp.push(results.rows.item(i));
                setSi(temp);
              }
            });  
          });

          db.transaction((tx2) => {
            tx2.executeSql(`SELECT u.nombre, t.auto, t.tratamiento_id, t.fecha_inicio, t.costo, 'No' As [repuesto]
                           FROM users u, treatments t
                           WHERE u.matricula = t.auto and t.tratamiento_id NOT IN (SELECT DISTINCT tratamiento_id FROM replacements)`, [], (tx2, results2) => {
            console.log("results", results2);
            if (results2.rows.length > 0) {
              var temp2 = [];
              for (let i = 0; i < results2.rows.length; ++i)
                temp2.push(results2.rows.item(i));
              setNo(temp2);
            } 
            });
          })
          
      }, []);

      const listItemView = (item) => {
        return (
          <View key={item.id} style={styles.listItemView}>
            <MyText text={item.tratamiento_id} style={styles.text}/>
            <MyText text={item.nombre} style={styles.text}/>
            <MyText text={item.auto} style={styles.text}/>
            <MyText text={item.fecha_inicio} style={styles.text}/>
            <MyText text={item.costo} style={styles.text}/>
            <MyText text={item.repuesto} style={styles.text}/>
          </View>
        );
      };

      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.viewContainer}>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 20 }}
                data={Final}
                key={(index) => index.toString()}
                renderItem={({ item }) => listItemView(item)}
              />
          </View>
        </SafeAreaView>
      );
};

export default Consulta1

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
})
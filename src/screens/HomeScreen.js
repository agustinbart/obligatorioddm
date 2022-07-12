import React, {useEffect} from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/Button";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>

              <MyButton
                title="Usuarios"
                btnColor="#44BBA4"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("UserHomeScreen")}
              />

              <MyButton
                title="Autos"
                btnColor="#44BBA4"
                btnIcon="car"
                customPress={() => navigation.navigate("CarHomeScreen")}
              />

              <MyButton
                title="Tratamientos"
                btnColor="#44BBA4"
                btnIcon="wrench"
                customPress={() => navigation.navigate("TreatmentHomeScreen")}
              />

              <MyButton
                title="Insumos"
                btnColor="#44BBA4"
                btnIcon="oil-can"
                customPress={() => navigation.navigate("SupplyHomeScreen")}
              />

              <MyButton
                title="Repuestos"
                btnColor="#44BBA4"
                btnIcon="cogs"
                customPress={() => navigation.navigate("ReplacementHomeScreen")}
              />

              <MyButton
                title="Consulta"
                btnColor="#44BBA4"
                btnIcon="clipboard-list"
                customPress={() => navigation.navigate("Consulta1")}
              />
              
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
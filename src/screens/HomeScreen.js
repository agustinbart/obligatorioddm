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
                btnColor="green"
                btnIcon="user-plus"
                customPress={() => navigation.navigate("UserHomeScreen")}
              />

              <MyButton
                title="Autos"
                btnColor="orange"
                btnIcon="car"
                customPress={() => navigation.navigate("CarHomeScreen")}
              />

              <MyButton
                title="Tratamientos"
                btnColor="red"
                btnIcon="wrench"
                customPress={() => navigation.navigate("CarHomeScreen")}
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
    backgroundColor: "white",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
});
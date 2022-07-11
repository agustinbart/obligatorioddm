import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

// vamos a importar los componentes que vamoar a crear
import HomeScreen from "../screens/HomeScreen";
import UserHomeScreen from "../screens/usuarios/UserHomeScreen";
import RegisterUser from "../screens/usuarios/RegisterUser";
import UpdateUser from "../screens/usuarios/UpdateUser";
import ViewAllUsers from "../screens/usuarios/ViewAllUsers";
import ViewUser from "../screens/usuarios/ViewUser";
import DeleteUser from "../screens/usuarios/DeleteUser";
import CarHomeScreen from "../screens/autos/CarHomeScreen";
import RegisterCar from "../screens/autos/RegisterCar";
import DeleteCar from "../screens/autos/DeleteCar";
import UpdateCar from "../screens/autos/UpdateCar";
import ViewAllCars from "../screens/autos/ViewAllCars";
import ViewCar from "../screens/autos/ViewCar";
import TreatmentHomeScreen from "../screens/tratamientos/TreatmentHomeScreen";
import DeleteTreatment from "../screens/tratamientos/DeleteTreatment";
import RegisterTreatment from "../screens/tratamientos/RegisterTreatment";
import UpdateTreatment from "../screens/tratamientos/UpdateTreatment";
import ViewAllTreatments from "../screens/tratamientos/ViewAllTreatments";
import ViewTreatment from "../screens/tratamientos/ViewTreatment";
import ReplacementHome from "../screens/repuestos/ReplacementHomeScreen";
import RegisterReplacement from "../screens/repuestos/RegisterReplacement";
import DeleteReplacement from "../screens/repuestos/DeleteReplacement";
import UpdateReplacement from "../screens/repuestos/UpdateReplacement";
import ViewReplacement from "../screens/repuestos/ViewReplacement";
import ViewAllReplacements from "../screens/repuestos/ViewAllReplacements";
import SupplyHomeScreen from "../screens/insumos/SupplyHomeScreen";
import RegisterSupply from "../screens/insumos/RegisterSupply";
import DeleteSupply from "../screens/insumos/DeleteSupply";
import UpdateSupply from "../screens/insumos/UpdateSupply";
import ViewAllSupplies from "../screens/insumos/ViewAllSupplies";
import ViewSupply from "../screens/insumos/ViewSupply";
import Consulta1 from "../screens/consultas/Consulta1";

// crear componente de rutas
const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
        <Stack.Screen // Usuarios
          name="UserHomeScreen"
          component={UserHomeScreen}
          options={{
            title: "User Home",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        /> 

        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{
            title: "Registrar Usuario",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{
            title: "Modificar Usuario",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllUsers"
          component={ViewAllUsers}
          options={{
            title: "Ver todos los Usuario",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewUser"
          component={ViewUser}
          options={{
            title: "Ver Usuario",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{
            title: "Borrar Usuario",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen //Autos
          name="CarHomeScreen"
          component={CarHomeScreen}
          options={{
            title: "Cars Home",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterCar"
          component={RegisterCar}
          options={{
            title: "Registrar Auto",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteCar"
          component={DeleteCar}
          options={{
            title: "Borrar Auto",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateCar"
          component={UpdateCar}
          options={{
            title: "Actualizar Auto",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

    <Stack.Screen
          name="ViewAllCars"
          component={ViewAllCars}
          options={{
            title: "Ver todos los autos",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

    <Stack.Screen
          name="ViewCar"
          component={ViewCar}
          options={{
            title: "Ver auto",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      
      <Stack.Screen // Tratamientos
          name="TreatmentHomeScreen"
          component={TreatmentHomeScreen}
          options={{
            title: "Treatments Home",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

      <Stack.Screen
          name="RegisterTreatment"
          component={RegisterTreatment}
          options={{
            title: "Registrar Tratamiento",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
      />

        <Stack.Screen
          name="DeleteTreatment"
          component={DeleteTreatment}
          options={{
            title: "Borrar Tratamiento",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateTreatment"
          component={UpdateTreatment}
          options={{
            title: "Actualizar Tratamiento",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

    <Stack.Screen
          name="ViewAllTreatments"
          component={ViewAllTreatments}
          options={{
            title: "Ver todos los tratamientos",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

    <Stack.Screen
          name="ViewTreatment"
          component={ViewTreatment}
          options={{
            title: "Ver tratamiento",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

<Stack.Screen // Repuestos
          name="ReplacementHomeScreen"
          component={ReplacementHome}
          options={{
            title: "Replacements Home",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

      <Stack.Screen
          name="RegisterReplacement"
          component={RegisterReplacement}
          options={{
            title: "Registrar Repuesto",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
      />

        <Stack.Screen
          name="DeleteReplacement"
          component={DeleteReplacement}
          options={{
            title: "Borrar Repuesto",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateReplacement"
          component={UpdateReplacement}
          options={{
            title: "Actualizar Repuesto",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

    <Stack.Screen
          name="ViewAllReplacements"
          component={ViewAllReplacements}
          options={{
            title: "Ver todos los repuestos",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

    <Stack.Screen
          name="ViewReplacement"
          component={ViewReplacement}
          options={{
            title: "Ver repuesto",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

<Stack.Screen // Insumos
          name="SupplyHomeScreen"
          component={SupplyHomeScreen}
          options={{
            title: "Insumos Home",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

      <Stack.Screen
          name="RegisterSupply"
          component={RegisterSupply}
          options={{
            title: "Registrar Insumo",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
      />

        <Stack.Screen
          name="DeleteSupply"
          component={DeleteSupply}
          options={{
            title: "Borrar Insumo",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateSupply"
          component={UpdateSupply}
          options={{
            title: "Actualizar Insumo",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

    <Stack.Screen
          name="ViewAllSupplies"
          component={ViewAllSupplies}
          options={{
            title: "Ver todos los insumos",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

    <Stack.Screen
          name="ViewSupply"
          component={ViewSupply}
          options={{
            title: "Ver insumo",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Consulta1"
          component={Consulta1}
          options={{
            title: "Consulta",
            headerStyle: {
              backgroundColor: "#2A363B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
// exportar componente
export default RootStack;
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
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="UserHomeScreen"
          component={UserHomeScreen}
          options={{
            title: "User Home",
            headerStyle: {
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="CarHomeScreen"
          component={CarHomeScreen}
          options={{
            title: "Cars Home",
            headerStyle: {
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      
      <Stack.Screen
          name="TreatmentHomeScreen"
          component={TreatmentHomeScreen}
          options={{
            title: "Treatments Home",
            headerStyle: {
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
              backgroundColor: "#f4511e",
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
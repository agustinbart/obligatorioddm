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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// exportar componente
export default RootStack;
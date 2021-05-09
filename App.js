import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/views/SignUp";
import SignIn from "./src/views/SignIn";
import ForgotPass from "./src/views/ForgotPass";
import CodeVerification from "./src/views/CodeVerification";
import PhoneVerification from "./src/views/PhoneVerification";

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="CodeVerification" component={CodeVerification} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(225,225,225)",
  },
});

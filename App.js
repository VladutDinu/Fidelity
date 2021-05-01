import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  CheckBox,
} from "react-native";

import { Asset } from "expo-asset";
import { AppLoading } from "expo";

export default class App extends React.Component {
  state = {
    email: "",
    password: "",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Logo</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
        <CheckBox value={false} style={styles.checkbox}></CheckBox>
          <View style={{ marginRight: 50 }}>
            <Text style={styles.rememberMe}>
              Remember Me
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPass}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signinBtn}>
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.notAccText}>Don't have an account yet?</Text>
        </View>
        <TouchableOpacity style={styles.createAccBtn}>
          <Text style={styles.createAccText}>Create account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(225,225,225)",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "rgb(42,54,59)",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    fontSize: 15,
    color: "black",
  },
  rememberMe: {
    marginTop:4.5,
    color: "black",
    fontSize: 15,
  },
  checkbox:{
    color:"black"
  },
  forgotPass: {
    marginTop:4.5,
    color: "black",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    fontSize: 15,
  },
  signinBtn: {
    width: "80%",
    backgroundColor: "rgb(42,54,59)",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 7.5,
  },
  signinText: {
    color: "white",
    fontSize: 15,
  },
  createAccBtn: {
    width: "80%",
    backgroundColor: "rgb(42,54,59)",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    marginBottom: 10,
  },
  createAccText: {
    color: "white",
    fontSize: 15,
  },
  notAccText: {
    color: "black",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 13,
  },
});

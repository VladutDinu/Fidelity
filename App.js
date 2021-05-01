import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Image
} from "react-native";

import { Asset } from "expo-asset";
import { AppLoading } from "expo";
const REGISTER_URL = 'http://127.0.0.1:5001/register_user';
export default class App extends React.Component {
  state = {
    email: "",
    password: "",
  };

  userRegister = () =>{
    const {username} = "name";
		const {email} = this.state;
		const {password} = this.state;
    var json = {
        'username': "username",
        'email' : email,
        'password' : password
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", REGISTER_URL);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send(JSON.stringify(json));
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}><Image source = {require("./assets/logo.png")}/></Text>
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
        <TouchableOpacity onPress={this.userRegister} style={styles.createAccBtn}>
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
    color: "rgb(42,54,59)",
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

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Image,
} from "react-native";

import { Asset } from "expo-asset";
import { AppLoading } from "expo";

export default class SignUp extends React.Component {
  state = {
    full_name: "",
    username: "",
    password: "",
    confirm_pass:"",
    email: "",
    phone_number: "",
    day: "",
    month: "",
    year: "",
  };

  render() {
    this.props.navigation.setOptions({
        headerBackTitle: "",
        headerShown: false,
      });
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>
          <Image source={require("./assets/logo.png")} />
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Full Name"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ full_name: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ username: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ confirm_pass: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="E-mail"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ phone_number: text })}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
              <Text style={{ marginTop:3,marginRight:70 ,fontSize:17}} >Gender</Text>
          </View>
          <View style={{ marginRight: 60 }}>
          <TouchableOpacity style={styles.genderBtn}>
            <Text style={{color:"white",fontSize:15}} >Male</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.genderBtn}>
            <Text style={{color:"white",fontSize:15}}>Female</Text>
          </TouchableOpacity>
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
    color: "rgb(42,54,59)",
    marginBottom: 25,
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
  genderBtn: {
    width:60,
    backgroundColor: "rgb(42,54,59)",
    borderRadius: 3.25,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    marginBottom: 15,
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

});

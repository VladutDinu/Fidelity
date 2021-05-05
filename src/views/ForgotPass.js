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

export default class ForgotPass extends React.Component {
  state = {
    email: "",
    password: "",
  };

  render() {
    this.props.navigation.setOptions({
      headerBackTitle: "",
      headerShown: false,
    });
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>
          <Image source={require("../../assets/logo.png")} />
        </Text>
        <View>
          <Text style={styles.forgotPassText}>
            Forgot Password?
          </Text>
        </View>
        <View>
          <Text style={styles.codeSentText}>
            We will send you a code to reset your password.
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("CodeVerification")} style={styles.SubmitBtn} >
          <Text style={styles.SubmitText} >Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("SignIn")} style={styles.BackText} >
          <Text>Back to Sign In</Text>
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
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  forgotPassText:{
    fontSize:25,
    paddingRight:100,
    paddingBottom:10
  },
  codeSentText:{
    fontSize:14,
    paddingBottom:10

  },
  logo: {
    color: "rgb(42,54,59)",
    marginTop: 50,
    marginBottom: 50,
  },
  SubmitBtn: {
    width: "80%",
    backgroundColor: "rgb(42,54,59)",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 7.5,
  },
  SubmitText: {
    color: "white",
    fontSize: 15,
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
  BackText:{
    fontSize:10,
    paddingTop:10
  }
});

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { register_user } from "../Services/UserServices/User.services";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";

export default class PhoneVerification extends React.Component {
  state = {
    phone_number: "",
    checkPrivacy: false,
    checkTerms:false,
    VALID_full_name: true,
    VALID_username: true,
    VALID_password: true,
    VALID_confirm_password: true,
    VALID_email: true,
    VALID_phone_number: true,
    VALID_date_of_birth: true,
  };

  registerButton = () => {
    if (
      this.state.VALID_full_name &&
      this.state.VALID_username &&
      this.state.VALID_password &&
      this.state.VALID_confirm_password &&
      this.state.VALID_email &&
      this.state.VALID_phone_number &&
      this.state.VALID_date_of_birth
    ) {
      register_user(this.state);
      this.props.navigation.navigate({
        name: "CodeVerification",
        params: { userEmail: this.state.email },
      });
    }
  };

  handleUsername = (text) => {
    console.log(this.state.VALID_username);
    if (text.trim().length >= 5) {
      this.setState({ username: text });
      this.setState({ VALID_username: true });
    } else {
      this.setState({ username: text });
      this.setState({ VALID_username: false });
    }
  };

  handleFullName = (text) => {
    console.log(this.state.VALID_full_name);
    if (text.trim().length >= 5) {
      this.setState({ full_name: text });
      this.setState({ VALID_full_name: true });
    } else {
      this.setState({ full_name: text });
      this.setState({ VALID_full_name: false });
    }
  };

  handlePassword = (text) => {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    console.log(this.state.VALID_password);
    if (strongRegex.test(text)) {
      this.setState({ password: text });
      this.setState({ VALID_password: true });
    } else {
      this.setState({ password: text });
      this.setState({ VALID_password: false });
    }
  };

  handleConfirmPassword = (text) => {
    console.log(this.state.VALID_confirm_password);
    if (text == this.state.password) {
      this.setState({ confirm_pass: text });
      this.setState({ VALID_confirm_password: true });
    } else {
      this.setState({ confirm_pass: text });
      this.setState({ VALID_confirm_password: false });
    }
  };

  handleEmail = (text) => {
    var strongRegex = new RegExp(
      "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@[a-zA-Z0-9-](?:.[a-zA-Z0-9-]+)*"
    );
    console.log(this.state.VALID_email);
    if (text.trim().length >= 5) {
      this.setState({ email: text });
      this.setState({ VALID_email: true });
    } else {
      this.setState({ email: text });
      this.setState({ VALID_email: false });
    }
  };

  handlePhoneNumber = (text) => {
    console.log(this.state.VALID_phone_number);
    if (text.trim().length >= 5) {
      this.setState({ phone_number: text });
      this.setState({ VALID_phone_number: true });
    } else {
      this.setState({ phone_number: text });
      this.setState({ VALID_phone_number: false });
    }
  };
  render() {
    this.props.navigation.setOptions({
      headerBackTitle: "",
      headerShown: false,
    });

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={"padding"}
          style={{ flex: 1, alignItems: "center", padding: 10 ,paddingTop:"30%"}}
        >
          <Text style={styles.logo}>
            <Image source={require("../../assets/logo.png")} />
          </Text>
          <View style={styles.containerInput}>
            <View style={styles.inputViewNumber}>
              <Text style={styles.inputViewNumberText}>+40</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Phone Number"
                placeholderTextColor="#003f5c"
                value={this.state.phone_number}
                onChangeText={(text) =>
                  this.handlePhoneNumber(text.split(" ").join(""))
                }
              />
            </View>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checkTerms}
              onValueChange={() => this.setState({ checkTerms: !this.state.checkTerms })}
            />
            <Text style={{marginTop: 5}}> I have read and agree to the <Text style={{textDecorationLine: 'underline',}} onPress={() => this.props.navigation.navigate("TermsAndConditions")}>Terms and conditions</Text></Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
            <CheckBox
              value={this.state.checkPrivacy}
              onValueChange={() => this.setState({ checkPrivacy: !this.state.checkPrivacy })}
            />
            <Text style={{marginTop: 5}}>I have read and understood the <Text style={{textDecorationLine: 'underline' }} onPressIn={() => this.props.navigation.navigate("PrivacyPolicy")}>Privacy Policy</Text></Text>
            </View>
            </View>
          <TouchableOpacity
            style={styles.Continue}
            onPress={this.registerButton}
          >
            <Text style={styles.ContinueText}>Continue</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(225,225,225)",
  },
  logo: {
    marginTop: 50,
    marginBottom: 50,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputViewNumber: {
    width: "20%",
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  inputViewNumberText: {
    justifyContent: "center",
    fontSize: 15,
    color: "black",
  },
  inputView: {
    width: "60%",
    backgroundColor: "white",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    marginRight: 10,
  },
  inputText: {
    height: 50,
    fontSize: 15,
    color: "black",
  },
  checkBoxContainer:{
    fontSize :10
  },
  Continue: {
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    backgroundColor: "rgb(42,54,59)",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    marginTop:15
  },
  ContinueText: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 16.5,
  },
});

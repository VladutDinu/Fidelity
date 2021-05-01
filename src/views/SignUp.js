import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  CheckBox,
  Image,
  Animatable
} from "react-native";
import { register_user } from "../Services/UserServices/User.services";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";



export default class SignUp extends React.Component {
  state = {
    full_name: "",
    username: "",
    password: "",
    confirm_pass: "",
    email: "",
    phone_number: "",
    day: "",
    month: "",
    year: "",
    VALID_full_name: true,
    VALID_username: true,
    VALID_password: true,
    VALID_confirm_password: true,
    VALID_email: true,
    VALID_phone_number: true,
    VALID_date_of_birth: true
  };

  registerButton = () => {
    if (this.state.VALID_full_name &&
      this.state.VALID_username &&
      this.state.VALID_password &&
      this.state.VALID_confirm_password &&
      this.state.VALID_email &&
      this.state.VALID_phone_number &&
      this.state.VALID_date_of_birth) {
      register_user(this.state);
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
  }

  handleFullName = (text) => {
    console.log(this.state.VALID_full_name);
    if (text.trim().length >= 5) {
      this.setState({ full_name: text });
      this.setState({ VALID_full_name: true });
    } else {
      this.setState({ full_name: text });
      this.setState({ VALID_full_name: false });
    }
  }

  handlePassword = (text) => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    console.log(this.state.VALID_password);
    if (strongRegex.test(text)) {
      this.setState({ password: text });
      this.setState({ VALID_password: true });
    } else {
      this.setState({ password: text });
      this.setState({ VALID_password: false });
    }
  }

  handleConfirmPassword = (text) => {
    console.log(this.state.VALID_confirm_password);
    if (text == this.state.password) {
      this.setState({ confirm_pass: text });
      this.setState({ VALID_confirm_password: true });
    } else {
      this.setState({ confirm_pass: text });
      this.setState({ VALID_confirm_password: false });
    }
  }

  handleEmail = (text) => {
    
    var strongRegex = new RegExp("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@[a-zA-Z0-9-](?:\.[a-zA-Z0-9-]+)*");
    console.log(this.state.VALID_email);
    if (text.trim().length >= 5) {
      this.setState({ email: text });
      this.setState({ VALID_email: true });
    } else {
      this.setState({ email: text });
      this.setState({ VALID_email: false });
    }
  }

  handlePhoneNumber = (text) => {
    console.log(this.state.VALID_phone_number);
    if (text.trim().length >= 5) {
      this.setState({ phone_number: text });
      this.setState({ VALID_phone_number: true });
    } else {
      this.setState({ phone_number: text });
      this.setState({ VALID_phone_number: false });
    }
  }
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

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Full Name"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.handleFullName(text)}
          />
          {this.state.VALID_full_name ? null :
            <Text>Name has to be at least 10 chars long</Text>
          }
        </View>


        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            value={this.state.username}
            onChangeText={(text) => this.handleUsername(text.split(" ").join(""))}
          />
          {this.state.VALID_username ? null :
            <Text>Username has to be at least 8 chars long</Text>
          }
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={this.state.password}
            onChangeText={(text) => this.handlePassword(text.split(" ").join(""))}
          />
          {this.state.VALID_password ? null :
            <Text>Password must be 8 chars long, have at least one upper case letter and one special char</Text>
          }
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            value={this.state.confirm_pass}
            onChangeText={(text) => this.handleConfirmPassword(text.split(" ").join(""))}
          />
          {this.state.VALID_confirm_password ? null :
            <Text>Passwords must match</Text>
          }
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="E-mail"
            placeholderTextColor="#003f5c"
            value={this.state.email}
            onChangeText={(text) => this.handleEmail(text.split(" ").join(""))}
          />
          {this.state.VALID_email ? null :
            <Text>Name has to be at least 10 chars long</Text>
          }
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            value={this.state.phone_number}
            onChangeText={(text) => this.handlePhoneNumber(text.split(" ").join(""))}
          />
          {this.state.VALID_phone_number ? null :
            <Text>Name has to be at least 10 chars long</Text>
          }
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={{ marginTop: 3, marginRight: 70, fontSize: 17 }} >Gender</Text>
          </View>
          <View style={{ marginRight: 60 }}>
            <TouchableOpacity style={styles.genderBtn}>
              <Text style={{ color: "white", fontSize: 15 }} >Male</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.genderBtn}>
            <Text style={{ color: "white", fontSize: 15 }}>Female</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.createAccBtn} onPress={this.registerButton} >
          <Text style={styles.createAccText} >Create account</Text>
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
    width: 60,
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

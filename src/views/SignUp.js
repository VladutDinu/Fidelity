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



export default class PhoneVerification extends React.Component {
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
      this.state.VALID_date_of_birth) 
      {
        register_user(this.state);
        this.props.navigation.navigate({name: "CodeVerification", params: { userEmail: this.state.email }})
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

        {this.state.VALID_full_name ? null :
            <Text style={{paddingBottom:15}}>Name has to be at least 10 chars long</Text>
          }


        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            value={this.state.username}
            onChangeText={(text) => this.handleUsername(text.split(" ").join(""))}
          />
          
        </View>
        {this.state.VALID_username ? null :
            <Text style={{paddingBottom:15}}>Username has to be at least 8 chars long</Text>
          }

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="E-mail"
            placeholderTextColor="#003f5c"
            value={this.state.email}
            onChangeText={(text) => this.handleEmail(text.split(" ").join(""))}
          />
          
        </View>
        {this.state.VALID_email ? null :
            <Text style={{paddingBottom:15}}>Name has to be at least 10 chars long</Text>
          }
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            value={this.state.phone_number}
            onChangeText={(text) => this.handlePhoneNumber(text.split(" ").join(""))}
          />
          
        </View>
        {this.state.VALID_phone_number ? null :
            <Text style={{paddingBottom:15}}>Name has to be at least 10 chars long</Text>
          }
        <TouchableOpacity style={styles.Continue} onPress={this.registerButton} 
        //onPressIn={() => this.props.navigation.navigate("CodeVerification", { params: this.state.email })}  
        >
          <Text style={styles.ContinueText} >Continue</Text>
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

  Continue: {
    width: "65%",
    backgroundColor: "rgb(42,54,59)",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    marginBottom: 10,
  },
  ContinueText: {
    color: "white",
    fontSize: 15,
  },

});

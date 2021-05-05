import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";

export default class CodeVerification extends React.Component {
  state = {
    inputText: "",
    lengthInput : 6,
  };

  render() {
    this.props.navigation.setOptions({
      headerBackTitle: "",
      headerShown: false,
    });
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'padding'} style={{flex:1,alignItems:'center',padding:10}} >
        <Text style={styles.logo}>
          <Image source={require("../../assets/logo.png")} />
        </Text>
        <View >
          <Text style={styles.emailText}>
            Please type the verification code sent to your email.
          </Text>
        </View>
        <View >
          <TextInput onChangeText={(text) => this.setState({ inputText: text })}
            style={{width:0,height:0}}
            value={this.state.inputText}
            maxLength={this.state.lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.containerInput}>
          {
            Array(this.state.lengthInput).fill().map((data,index)=>(
            <View key={index} style={styles.cellView}>
            <Text style={styles.cellText} onPress={()=> inputText.focus()}>1</Text>
            </View>
            ))
          }
    
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("SignIn")}
          style={styles.ConfirmBtn}
        >
          <Text style={styles.ConfirmText}>Confirm</Text>
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
  emailText:{
    alignItems:"center",
    justifyContent:"center",
    fontSize:20,
    paddingRight:30,
    paddingLeft:30,
    fontFamily:"sans-serif-condensed"
  },
  containerInput:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'

  },
  cellView:{
    backgroundColor:"#ffffff",
    marginTop:25,
    paddingVertical:11,
    width:40,
    margin:5,
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:1.5,
    borderRadius:5
  },
  cellText:{
    textAlign:'center',
    fontSize:20
  },
  ConfirmBtn: {
    width: "70%",
    backgroundColor: "rgb(42,54,59)",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 7.5,
  },
  ConfirmText: {
    color: "white",
    fontSize: 17.5,
  },
});

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
import { get_users_email } from "../Services/UserServices/User.services";
let textArray = Array(6).fill('');
export default class CodeVerification extends React.Component {
  state = {
    inputText: textArray,
    lengthInput : 6,
    verifCode: "",
    focusedIndex:null,
    userEmail:this.props.route.params.userEmail,
    matchCode: null
  };
  onChangeText = (text, index) => {
    // as there are going to be a lot of setState calls
    // we need access the prevState before we set the next state.
    this.setState(inputText => {
      this.state.inputText[index] = text
      return {
        textArray: this.state.inputText
      }
    })
  }

  submitCode = () => {
    let jsonData = get_users_email(this.state.userEmail).then(data => {
      console.log(data['code']);
      if(data['code'] == this.state.inputText.join('')){
        this.state.matchCode=true;
        this.props.navigation.navigate("SignIn");
      }
      else{
        this.state.matchCode=false;
        console.log(this.state.inputText.join(''));

      }
    });
    console.log(this.state.verifCode);

  }
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
          <Text style={styles.numberText}>
            Please type the verification code sent to +40 7** *** 450
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
            <View key={index} style={[styles.cellView]}>
              <TextInput style={styles.cellText} onPress={()=> inputText.focus()} 
              onChangeText={(text) => this.onChangeText(text, index)}
              onFocus={() => this.setState({focusedIndex: index})}
              onBlur={() => this.setState({focusedIndex: null})}
              value={this.state.inputText[index]}
              maxLength = {1}
              />
            </View>
            ))
          }
    
        </View>
        <TouchableOpacity
          onPress={this.submitCode}
          onPressIn={() => this.props.navigation.navigate("MainPage")}
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
  numberText:{
    alignItems:"center",
    justifyContent:"center",
    fontSize:20,
    paddingRight:30,
    paddingLeft:30,
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
    borderRadius:5,
    
  },
  cellText:{
    width: "55%",
    textAlign:'center',
    fontSize:20
  },
  ConfirmBtn: {
    width: "70%",
    backgroundColor: "rgb(42,54,59)",
    borderRadius: 5,
    height: "7.5%",
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

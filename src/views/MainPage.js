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
export default class MainPage extends React.Component {
  render() {
    this.props.navigation.setOptions({
      headerBackTitle: "",
      headerShown: false,
    });
    return (
      <Text>Home</Text>
    );
  }
}


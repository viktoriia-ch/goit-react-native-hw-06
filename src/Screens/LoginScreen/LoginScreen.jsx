import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSingInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const submitForm = () => {
    Keyboard.dismiss();
    dispatch(authSingInUser(state));
    setState(initialState);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../../assets/images/background-img.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.form}
          >
            <Text style={styles.title}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder={"E-mail"}
              placeholderTextColor={"#BDBDBD"}
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />

            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder={"Password"}
              placeholderTextColor={"#BDBDBD"}
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
            />
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.5}
              onPress={submitForm}
            >
              <Text style={styles.btnTitle}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
              Don't have an account?{" "}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.navigationText}>Register</Text>
              </TouchableOpacity>
            </Text>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  form: {
    flex: 0.5,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  title: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 500,
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 32,
  },

  input: {
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    textAlign: "center",
  },

  btn: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 25,
    marginHorizontal: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },

  btnTitle: {
    color: "#FFFFFF",
  },

  text: {
    lineHeight: 22,
    marginTop: 16,
    alignSelf: "center",
    color: "rgba(27, 67, 113, 1)",
  },

  navigationText: {
    color: "#00008b",
  },
});

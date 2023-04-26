import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import { authLogUpUser } from "../../redux/auth/authOperations";

const initialState = {
  nickname: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const submitForm = () => {
    Keyboard.dismiss();
    // console.log(state);
    dispatch(authLogUpUser(state));
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
            <View style={styles.photoBlock}>
              <View style={styles.plusBtn}>
                <Text style={styles.plus}>+</Text>
              </View>
            </View>
            <Text style={styles.title}>Registration</Text>
            <TextInput
              style={styles.input}
              placeholder={"Login"}
              placeholderTextColor={"#BDBDBD"}
              value={state.nickname}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, nickname: value }))
              }
            />
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
              <Text style={styles.btnTitle}>Register</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
              Already have an account?{" "}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.navigationText}>Log in</Text>
              </TouchableOpacity>
            </Text>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

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
    flex: 0.75,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  photoBlock: {
    position: "absolute",
    alignSelf: "center",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  plusBtn: {
    position: "absolute",
    bottom: 15,
    right: -12,
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: "50%",
    alignItems: "center",
  },

  plus: {
    color: "#FF6C00",
    fontSize: 18,
    fontWeight: 300,
  },

  title: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 500,
    alignSelf: "center",
    marginBottom: 16,
    marginTop: 92,
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

import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { authSingOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const singOut = () => {
    dispatch(authSingOutUser());
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require("../../../assets/images/background-img.png")}
      >
        <View style={styles.profileBlock}>
          <View style={styles.photoBlock}>
            <Image source={require("../../../assets/images/User_large.png")} />
            <View style={styles.deleteBtn}>
              <Text style={styles.delete}>x</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.exitBtn}
            onPress={singOut}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.userName}>Natali Romanova</Text>
        </View>

        <View></View>
      </ImageBackground>
    </View>
  );
};

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

  profileBlock: {
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

  exitBtn: {
    position: "absolute",
    top: 24,
    right: 19,
  },

  deleteBtn: {
    position: "absolute",
    bottom: 15,
    right: -12,
    width: 25,
    height: 25,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(232, 232, 232, 1)",
    borderRadius: "50%",
    alignItems: "center",
  },

  delete: {
    color: "rgba(232, 232, 232, 1)",
    fontSize: 18,
    fontWeight: 300,
  },

  userName: {
    color: "rgba(33, 33, 33, 1)",
    fontSize: 30,
    fontWeight: 500,
    marginTop: 92,
    marginLeft: 70,
  },
});

export default ProfileScreen;

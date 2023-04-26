import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import { storage } from "../../firebase/config";
import { db } from "../../firebase/config";

const upload = "Upload photo";
const edit = "Edit photo";

const CreatePostsScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { userId, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const id = Date.now().toString();

    const storageRef = await ref(storage, `postImages/${id}`);

    await uploadBytes(storageRef, file);

    const storeLink = await getDownloadURL(ref(storageRef));
    return storeLink;
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      const docRef = await addDoc(collection(db, "posts"), {
        photo,
        name,
        location: location.coords,
        nickname,
        userId,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const takePhoto = async () => {
    try {
      if (cameraRef) {
        const takenPhoto = await cameraRef.takePictureAsync();
        const location = await Location.getCurrentPositionAsync();
        setLocation(location);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setPhoto(takenPhoto.uri);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
    setPhoto(null);
    setCameraRef(null);
    setName("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          {photo && (
            <View style={styles.photoContainer}>
              <Image style={styles.photo} source={{ uri: photo }} />
            </View>
          )}
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <MaterialCommunityIcons
              style={styles.icon}
              name="camera-flip-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={takePhoto}
          ></TouchableOpacity>
        </Camera>
        <Text style={styles.loadBtn}>{photo ? upload : edit}</Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor={"#BDBDBD"}
          style={styles.input}
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          placeholder="Location"
          placeholderTextColor={"#BDBDBD"}
          style={styles.input}
        />

        {photo && (
          <TouchableOpacity
            style={styles.btnPublicationActive}
            onPress={sendPhoto}
          >
            <Text style={styles.btnActivePublicationText}>Publish</Text>
          </TouchableOpacity>
        )}

        {!photo && (
          <TouchableOpacity style={styles.btnPublication} disabled>
            <Text style={styles.btnPublicationText}>Publish</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  camera: {
    marginLeft: "auto",
    marginRight: "auto",
    height: 240,
    width: 343,
    marginTop: 32,
    borderRadius: 10,
  },

  btn: {
    width: "100%",
    height: "100%",
  },

  photoContainer: {
    position: "absolute",
  },

  photo: {
    height: 240,
    width: 343,
  },

  loadBtn: {
    marginLeft: 16,
    marginTop: 8,
    color: "#BDBDBD",
    fontSize: 16,
  },

  input: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 32,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  btnPublication: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 32,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  btnPublicationActive: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 32,
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  btnPublicationText: {
    color: "#BDBDBD",
  },

  btnActivePublicationText: {
    color: "#FFFFFF",
  },

  flipContainer: {
    padding: 10,
    alignSelf: "flex-end",
  },
});

export default CreatePostsScreen;

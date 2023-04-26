import { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const DefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      const post = { ...doc.data(), id: doc.id };
      setPosts((prevState) => [...prevState, post]);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoBlock}>
        <Image source={require("../../../assets/images/User.png")} />
        <View style={styles.textBlock}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>

      <FlatList
        style={styles.photoList}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.photoContainer}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.photoName}>{item.name}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              >
                <View>
                  <EvilIcons name="comment" size={24} color="black" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", {
                    location: item.location,
                  })
                }
              >
                <View style={styles.mapContainer}>
                  <EvilIcons name="location" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },

  infoBlock: {
    flexDirection: "row",
    width: 230,
    height: 60,
    marginLeft: 16,
    marginTop: 32,
  },

  textBlock: {
    marginLeft: 8,
    alignSelf: "center",
  },

  name: {
    color: "#212121",
    fontWeight: 700,
  },

  photoList: {
    marginTop: 32,
  },

  photoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },

  photo: {
    height: 240,
    width: 343,
  },

  btnContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",
  },

  photoName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 500,
  },

  mapContainer: {
    flexDirection: "row",
  },
});

export default DefaultScreen;

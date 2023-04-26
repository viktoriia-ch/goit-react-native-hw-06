import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { doc, addDoc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { db } from "../../firebase/config";

const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { nickname } = useSelector((state) => state.auth);
  const { postId } = route.params;

  useEffect(() => {
    getAllComments();
  }, []);

  const createPost = async () => {
    const postRef = await doc(db, "posts", `${postId}`);
    await addDoc(collection(postRef, "comments"), {
      nickname,
      comment,
    });
  };

  const getAllComments = async () => {
    const postRef = await doc(db, "posts", `${postId}`);
    const querySnapshot = await getDocs(collection(postRef, "comments"));
    await querySnapshot.forEach((doc) => {
      const comment = { ...doc.data() };
      setAllComments((prevState) => [...prevState, comment]);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.block}>
          <FlatList
            data={allComments}
            keyExtractor={(item, ind) => ind.toString()}
            renderItem={({ item, id }) => (
              <View style={styles.comment}>
                <Text>{item.nickname}</Text>
                <View style={styles.commentText}>
                  <Text>{item.comment}</Text>
                </View>
              </View>
            )}
          ></FlatList>
          <View style={styles.commentBlock}>
            <TextInput
              placeholder="Comment..."
              style={styles.input}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.btn} onPress={createPost}>
              <View>
                <AntDesign name="arrowup" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  block: {
    flex: 1,
  },

  commentBlock: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    position: "relative",
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  comment: {
    flex: 1,
    padding: 16,
  },

  commentText: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    marginTop: 5,
    borderRadius: 6,
  },

  input: {
    width: "100%",
    height: 50,
    borderColor: "rgba(232, 232, 232, 1)",
    borderWidth: 1,
    borderRadius: 100,
    textAlign: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
  },

  btn: {
    backgroundColor: "#FF6C00",
    position: "absolute",
    right: 24,
    bottom: 8,
    borderRadius: 50,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommentsScreen;

import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperations";
import { TouchableOpacity, StyleSheet } from "react-native";

import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const singOut = () => {
    dispatch(authSingOutUser());
  };
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 85,
        },
      }}
    >
      <MainTab.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.exitBtn}
              onPress={singOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="appstore-o" size={size} color="#212121" />;
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        style={styles.addBtn}
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name="ios-add" size={size} color="#fff" />;
          },
          tabBarItemStyle: {
            backgroundColor: "#FF6C00",
            borderRadius: "50",
            marginTop: 9,
            height: 40,
            maxWidth: 70,
          },
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => {
            return <Feather name="user" size={size} color="#212121" />;
          },
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  exitBtn: {
    marginRight: 10,
  },
});

export default Home;

import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreen from "../../nestedScreens/DefaultScreen/DefaultScreen";
import MapScreen from "../../nestedScreens/MapScreen/MapScreen";
import CommentsScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";

const NestedScreens = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreens.Navigator>
      <NestedScreens.Screen
        options={{
          headerShown: false,
        }}
        name="DefaultScreen"
        component={DefaultScreen}
      />
      <NestedScreens.Screen name="Map" component={MapScreen} />
      <NestedScreens.Screen name="Comments" component={CommentsScreen} />
    </NestedScreens.Navigator>
  );
};

export default PostsScreen;

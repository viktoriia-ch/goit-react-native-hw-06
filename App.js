import { NavigationContainer } from "@react-navigation/native";

import useRoute from "./router";

export default function App() {
  const roating = useRoute(true);

  return <NavigationContainer>{roating}</NavigationContainer>;
}

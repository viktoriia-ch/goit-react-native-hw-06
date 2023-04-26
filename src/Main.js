import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { authStateChangeUser } from "./redux/auth/authOperations";
import useRoute from "./router";

const Main = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [dispatch]);

  const roating = useRoute(auth.stateChange);

  return <NavigationContainer>{roating}</NavigationContainer>;
};

export default Main;

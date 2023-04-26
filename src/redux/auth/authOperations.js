import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";
import { authSlice } from "./authSlice";

export const authLogUpUser =
  ({ email, password, nickname }) =>
  (dispatch, getState) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: nickname,
        }).then(() => {
          const { displayName, uid } = auth.currentUser;
          const userUpdateProfile = {
            userId: uid,
            nickname: displayName,
          };
          dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
        });
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

export const authSingInUser =
  ({ email, password, nickname }) =>
  (dispatch, setState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const { displayName, uid } = auth.currentUser;
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: uid,
            nickname: displayName,
          })
        );
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

export const authSingOutUser = () => async (dispatch, setState) => {
  await signOut(auth).then(() => console.log("signOut success"));

  dispatch(authSlice.actions.authSingOut());
};

export const authStateChangeUser = () => (dispatch, setState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

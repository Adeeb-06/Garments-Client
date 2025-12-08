/* eslint-disable no-useless-catch */
import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import api from "../api";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  const registerUser = async (email, password, name, photoURL, role) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential) throw new Error("Registration failed");
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL,
      });
      const res = await api.post("/register", {
        name,
        email,
        password,
        photoURL,
        role,
      });
      console.log(res);
      setLoading(false);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };
  //   console.log(user);
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUserData(null);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
      setLoading(true);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (email) => {
    try {
      const res = await api.get(
        `/users/${email}`,
      );
      if (res.status === 200) {
        setLoading(true);
        setUserData(res.data);
      }
    } catch (error) {
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, provider);

      const token = await res.user.getIdToken();

      const user = await api.post(
        "/google-register/",
        {
          name: res.user.displayName,
          email: res.user.email,
          password: res.user.email,
          photoURL: res.user.photoURL,
          role: res.user.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(user);

      return user;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  });

  useEffect(() => {
    if (user) {
      getUser(user.email);
      setLoading(false);
    }
  }, [user]);

  const authData = {
    user,
    setUser,
    userData,
    registerUser,
    googleSignIn,
    logout,
    loginUser,
    loading,
  };
  return <AuthContext value={authData}> {children} </AuthContext>;
};

export default AuthProvider;

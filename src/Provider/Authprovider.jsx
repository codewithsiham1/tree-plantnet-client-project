import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';


export const Authcontext=createContext(null)
const googleProvider = new GoogleAuthProvider();
const Authprovider = ({children}) => {
    const [user,setuser]=useState(null)
    const [loading,setloading]=useState(true)
  const createuser=(email,password)=>{
   setloading(true);
   return createUserWithEmailAndPassword(auth,email,password)
  }
  const signIn=(email,password)=>{
   return signInWithEmailAndPassword(auth,email,password)
  }
  const logout=()=>{
   setloading(true)
   return signOut(auth)
  }
  const googlelogin=()=>{
   setloading(true)
   return signInWithPopup(auth,googleProvider)
  }
const updateprofile = (name, photo) => {
  return updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
};
// logout function
const handlelogOut=async()=>{
  try{
    await axios.get('https://y-hbahojeoy-sihams-projects-6b0cef74.vercel.app/logout',{
      withCredentials:true
    });
    setuser(null)
   return
  }catch (error) {
      console.error('Logout failed:', error);
    }
}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setuser(currentUser);
      setloading(false);
    });

    return unsubscribe;
  }, []);
    const authInfo={
 user,loading,setuser,setloading,createuser,signIn,logout,googlelogin,updateprofile,handlelogOut
    }
    return (
       <Authcontext.Provider value={authInfo}>
       {children}
       </Authcontext.Provider>
    );
};

export default Authprovider;
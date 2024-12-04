import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD0Edc_k2_j3Zf8QEg0ZUkL0QZR4jnaCeI",
  authDomain: "netflix-clone-b3be1.firebaseapp.com",
  projectId: "netflix-clone-b3be1",
  storageBucket: "netflix-clone-b3be1.firebasestorage.app",
  messagingSenderId: "440614971939",
  appId: "1:440614971939:web:ae4441dffa1e787852df96"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app)

const signup=async (name,email,password)=>{
    try{
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user=res.user;
       await addDoc(collection(db, "user"),{
           uid:user.uid,
           name,
           authProvider:'local',
           email,
       });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login=async (email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout =()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}
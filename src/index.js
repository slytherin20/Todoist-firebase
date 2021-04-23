import React from "react";
import ReactDOM from "react-dom";
import { App }  from "./app";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase_config";

userSignIn = ()=>{ auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider()
)}

function SignIn(){
    return(<>
        <nav className="navbar">Todoist - A task keeping app</nav>
        <button className="signin" onClick={userSignIn}>Sign in with Google</button>
        </>
    )
}

function Main(){
    const [user] = useAuthState(auth);
    return user? <App />:<SignIn />
}


ReactDOM.render(
    <Main />,
    document.getElementById("root")
)
import React, { useState} from "react";
import { useEffect } from "react";
import firebase from "firebase";
import db from "./firebase_config";
import ShowTask from "./showtasks";
import { auth } from "./firebase_config";


function App(){
    let [task,setTask] = useState("");
    const [allTasks,setAllTasks] = useState([]);
    //const userId = auth.currentUser.uid;

    console.log(userId)
    useEffect(() => {
        getTodos();
    }, [])  //[] stays blank to launch only on first launch of app.

    function getTodos(){
        db.collection(`users/${userId}/todos`).onSnapshot(function (querySnapshot){

            setAllTasks(
                querySnapshot.docs.map((doc)=>(
                    {
                        id: doc.id,
                        task:doc.data().task,
                        inProgress:doc.data().inProgress
                    }
                ))
            )
        })
    }

    function changeHandler(e){
        setTask(e.target.value);
    }
    function showTasks(e){
        e.preventDefault()
        console.log("The task added is:"+task);
        db.collection(`users/${userId}/todos`).add({
            inProgress: true,
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setTask("");

    }
    function Signout(){
       auth.signOut()
    }
    return(
        <>
        <nav className="navbar">Todoist - A task keeping app</nav>
        <div className="container">
            <button className="signout" onClick={Signout}>Sign Out</button>
            <form className="form-element" onSubmit={showTasks}>
                <input className="input-box" placeholder="Enter the task here." value={task} onChange={changeHandler} required></input>
                <button className="add-btn">Add</button>
            </form>
            <div className="show-tasks">
                {
                    allTasks.map((task)=>{
                        return <ShowTask key={task.id} id={task.id} task={task.task} status={task.inProgress} userId={userId}/>
                    })
                }
            </div>
        </div>
        </>
    )
}

export default App;
import React, { useState , useEffect } from "react";
import firebase from "firebase";
import db from "./firebase_config";
import ShowTask from "./showtasks";

function App(){
    let [task,setTask] = useState("");
    const [allTasks,setAllTasks] = useState([]);

    useEffect(() => {
        getTodos();
    }, [])  //[] stays blank to launch only on first launch of app.

    function getTodos(){
        db.collection("todos").onSnapshot(function (querySnapshot){

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
        db.collection("todos").add({
            inProgress: true,
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setTask("");

    }
    return(
        <>
        <nav className="navbar">Todoist - A task keeping app</nav>
        <div className="container">
            <form className="form-element" onSubmit={showTasks}>
                <input className="input-box" placeholder="Enter the task here." value={task} onChange={changeHandler}></input>
                <button className="add-btn">Add</button>
            </form>
            <div className="show-tasks">
                {
                    allTasks.map((task)=>{
                        <ShowTask task={task}/>
                    })
                }
            </div>
        </div>
        </>
    )
}

export default App;
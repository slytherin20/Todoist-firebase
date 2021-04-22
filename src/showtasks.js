import React from "react";
import db from "./firebase_config";


function ShowTask({id,task,status}){

    function toggleDoneButton(){
        db.collection("todos").doc(id).update({
            inProgress:!status
        })
    }
    function deleteTask(){
        db.collection("todos").doc(id).delete();
    }
    return(
        <div className="task">
                <p className="task-name">{task}</p>
                <p className="status">{
                    status?"In Progress 🏋️‍♀️":"Completed ✅"
                
                }</p>
                <button className="Done" onClick={toggleDoneButton}>{status?"Done":"Undone"}</button>
                <button className="Delete" onClick={deleteTask}>Delete</button>

        </div>
    )
}

export default ShowTask;
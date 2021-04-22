import React from "react";

function ShowTask({task,status}){
    return(
        <div className="task">
                <p>{task}</p>
                <p>{
                    status?"In Progress 🏋️‍♀️":"Completed ✅"
                
                }</p>
                <button className="Done">Done ✅</button>
                <button className="Delete">Delete 🗑️</button>

        </div>
    )
}

export default ShowTask;
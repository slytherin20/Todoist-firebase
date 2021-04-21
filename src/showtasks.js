import react from "react";

function ShowTask(task){
    return(
        <div className="task">
            {   <>
                <p>{task.task}</p>
                <span>{task.inProgress}</span>

                </>
            }
        </div>
    )
}

export default ShowTask;
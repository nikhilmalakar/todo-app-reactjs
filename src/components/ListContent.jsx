import deleteIcon from "../images/trash.png"


    function ListContent(props){

        const tasks = (props.tasks);

        // setTimeout(handleSubmit, 10000);
        
        const listTitle = props.title;

        return(
            <div>   
                    {tasks && tasks.length > 0 ? (
                        <ul>
                        {tasks.map((task, index) => (

                                <li key={task.id} id={task.id} >
                                    {/* <input className="list-checkbox" type="checkbox" ></input> */}
                                <div className="listContent">
                                    <strong>{task.title}</strong> - {task.description}
                                </div>
                                <div className="deleteIcon">
                                    <img src={deleteIcon} onClick={ () =>
                                    props.clickHandler(task.id)
                                }/>
                                </div>
                            </li>

                        ))}
                        </ul>
                    ) : (
                        <p> {listTitle === "" ? "Plan you day now!" : "No tasks available!"}</p>
                    )}
                
            </div>
        )
    }

export default ListContent
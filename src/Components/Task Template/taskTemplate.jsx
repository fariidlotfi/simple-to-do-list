
import "./taskTemplate.css";

export default function taskTemplate(params) {
  const { id, title, taskColor } = params;

  const returnTaskID = (id) => {
    params.onStatusChange(id);
  };

  const returnID =(id)=> {
    params.onDeleteTask(id);
  }
  

  return (
    <>
      <div className="task-box-temp">
        <p>{title}</p>
        <div className="t2-extra-card-info">
          <div
            className="t2-task-color"
            style={{ backgroundColor: taskColor }}
          ></div>
          <div className="btns">
            <img
              src="assets/check.svg"
              onClick={() => returnTaskID(id)}
            />
            <img
              src="assets/delete.svg"
              onClick={() => {
                returnID(id);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

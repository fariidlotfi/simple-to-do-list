import { useState } from "react";
import BoxTemplate from "./Components/Task Template/taskTemplate";
import "./App.css";
import Tasks from "./taskData";

export default function App() {
  const [title, setTitle] = useState("");
  const [bgColor, setBgColor] = useState("red");
  const [allTasks, setTasks] = useState(Tasks);
  const [result, setResult] = useState();

  function submitHandler(event) {
    event.preventDefault();
  }

  function addTask() {
    const newID = allTasks.length + 1;
    const newTask = {
      id: newID,
      title: title,
      taskColor: bgColor,
      taskStatus: "not-complete",
    };
    title != ""
      ? setTasks([...allTasks, newTask])
      : alert("تسک خود را وارد نمایید");
    setResult("");
    setTitle("");
  }

  function titleGenerator(event) {
    setTitle(event.target.value);
  }

  function t2FilterHandler(event) {
    event.target.value != "all"
      ? setResult(allTasks.filter((i) => i.taskStatus == event.target.value))
      : setResult([...allTasks]);
  }

  function searchBarHandler(event) {
    setResult(allTasks.filter((i) => i.title.includes(event.target.value)));
  }

  function completeTask(incomingID) {
    const findTask = allTasks.find((i) => i.id == incomingID);
    findTask.taskStatus = "complete";
    allTasks[allTasks.indexOf(findTask)] = findTask;
    setTasks([...allTasks]);
  }

  function deleteTask(incomingID) {
    allTasks.splice(
      allTasks.indexOf(allTasks.find((i) => i.id == incomingID)),
      1
    );
    setTasks([...allTasks]);
  }

  return (
    <>
      <div className="to2-all">
        <div className="to2-container">
          <div className="t2-col-right">
            <div className="add-form">
              <form onSubmit={submitHandler}>
                <p>تسک خود را وارد نمایید:</p>
                <input
                  placeholder="عنوان تسک..."
                  onChange={titleGenerator}
                  type="text"
                  rows={5}
                  cols={40}
                />
                <div className="divider"></div>
                <p>رنگ تسک خود را انتخاب کنید:</p>
                <div className="t2-task-colors">
                  <div
                    className="t2-color-red"
                    onClick={() => {
                      setBgColor("red");
                    }}
                  ></div>
                  <div
                    className="t2-color-green"
                    onClick={() => {
                      setBgColor("green");
                    }}
                  ></div>
                  <div
                    className="t2-color-blue"
                    onClick={() => {
                      setBgColor("blue");
                    }}
                  ></div>
                </div>
                <div className="divider"></div>
                <button onClick={addTask}>اضافه کردن</button>
              </form>
            </div>
          </div>

          <div className="t2-col-left">
            <div className="t2-filters">
              <div className="t2-right-filter">
                <input
                  onChange={searchBarHandler}
                  type="text"
                  placeholder="جستجو"
                />
                <select onChange={t2FilterHandler}>
                  <option value="all">همه</option>
                  <option value="complete">تکمیل شده‌ها</option>
                  <option value="not-complete">فعال‌ها</option>
                </select>
              </div>
              <img src="/src/assets/white-gear.svg" />
            </div>

            <div className="all-task-section">
              {result
                ? result.map((item) => {
                    return (
                      <BoxTemplate
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        taskColor={item.taskColor}
                        onStatusChange={completeTask}
                        onDeleteTask={deleteTask}
                      />
                    );
                  })
                : allTasks.map((item) => {
                    return (
                      <BoxTemplate
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        taskColor={item.taskColor}
                        onStatusChange={completeTask}
                        onDeleteTask={deleteTask}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

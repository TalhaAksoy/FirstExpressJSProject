import React from "react";
import Navbar from "./components/navbar";

import getData from "./api/getData";
import addData from "./api/addData";

import { Task } from "./types/Task";
import deleteData from "./api/deleteData";
import updateData from "./api/updateData";

function App() {
  const [data, setData] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const checkboxRef = React.useRef<HTMLInputElement | null>(null);
  const modalInputRef = React.useRef<HTMLInputElement | null>(null);
  const modalCheckBoxRef = React.useRef<HTMLInputElement | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true); // İstek başladığında loading durumunu true yap
      const result = await getData("http://localhost:3000/api/getTasks");
      setData(result);
    } catch (error) {
      console.log(`Error Fetching Data => ${error}`);
    } finally {
      setLoading(false); // İstek tamamlandığında loading durumunu false yap
    }
  };

  const [taskData, setTaskData] = React.useState<string>("");
  const [editMenu, setEditMenu] = React.useState<boolean>(false);
  const [modalTaskId, setModalTaskId] = React.useState<number>(0);

  const handleMenuClick = (number: number) => {
    setEditMenu(!editMenu);
    setModalTaskId(number);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dark">
      <div
        className={`fixed inset-0 bg-blue-500/30 ${editMenu ? "flex" : "hidden"} justify-center items-center flex-col gap-y-4`}
      >
        <svg
          className="fixed top-10 right-10 bg-white rounded-full hover:cursor-pointer fill-red-600"
          onClick={() => {
            setEditMenu(!editMenu);
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 32 32"
        >
          <path d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z" />
        </svg>

        <input
          type="text"
          placeholder="change title"
          className="bg-[#222222] text-white p-2 rounded-md"
          ref={modalInputRef}
        />
        <span>
          {" "}
          <input id="modalCheck" type="checkbox" ref={modalCheckBoxRef} />{" "}
          <label htmlFor="modalCheck" className="text-white select-none">
            Change Complated
          </label>
        </span>
        <button
          onClick={() => {
            const data: Task = {
              id: modalTaskId,
              title: modalInputRef.current?.value as string,
              completed: modalCheckBoxRef.current?.checked as boolean,
            };
            updateData(data);
          }}
        >
          Update Task
        </button>
      </div>

      <div className="flex flex-col justify-start items-center dark:bg-[#222222] dark:text-white w-full min-h-[100svh]">
        <Navbar />
        <div className="flex overflow-auto flex-col flex-1 justify-center items-center w-full">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-y-2 w-full">
              {data.map((task) => (
                <div
                  className={`${task.id % 2 == 0 ? "bg-transparent" : "bg-[#303030]"} flex justify-between items-center py-2 w-11/12 mx-auto rounded-md px-2`}
                  key={task.id}
                >
                  <span>{task.id}</span>
                  <span className="px-4">{task.title}</span>
                  <div className="flex flex-row items-center">
                    <svg
                      className={`${task.completed === false ? "block" : "hidden"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 64 64"
                    >
                      <path
                        fill="#ec1c24"
                        d="M50.592 2.291L32 20.884C25.803 14.689 19.604 8.488 13.406 2.291c-7.17-7.17-18.284 3.948-11.12 11.12c6.199 6.193 12.4 12.395 18.592 18.592A32589.37 32589.37 0 0 1 2.286 50.595c-7.164 7.168 3.951 18.283 11.12 11.12c6.197-6.199 12.396-12.399 18.593-18.594l18.592 18.594c7.17 7.168 18.287-3.951 11.12-11.12c-6.199-6.199-12.396-12.396-18.597-18.594c6.2-6.199 12.397-12.398 18.597-18.596c7.168-7.166-3.949-18.284-11.12-11.11"
                      />
                    </svg>

                    <svg
                      className={`${task.completed === true ? "block" : "hidden"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 48 48"
                    >
                      <g
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                      >
                        <path
                          fill="#2F88FF"
                          stroke="#000"
                          d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z"
                        />
                        <path stroke="#fff" d="M17 24L22 29L32 19" />
                      </g>
                    </svg>
                    <svg
                      className="hover:cursor-pointer fill-[#990000] hover:fill-red-500 mr-2"
                      onClick={() => {
                        deleteData(task.id);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                    </svg>

                    <svg
                      onClick={() => {
                        handleMenuClick(task.id);
                      }}
                      className="fill-white hover:fill-[#999999] hover:cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 grid-rows-1 w-full border-t-2 border-white h-[200px]">
          <div className="flex justify-center items-center border-r-2 border-white">
            <button
              onClick={() => {
                fetchData();
              }}
              className="py-2 px-4 text-white rounded-md border-2"
            >
              Get Data Button
            </button>
          </div>

          <div className="flex flex-col gap-y-4 justify-center items-center border-r-2">
            <input
              type="text"
              className="pl-4 w-11/12 bg-transparent rounded-md border-2 focus:border-2 focus:border-blue-500"
              onChange={(e) => {
                setTaskData(e.target.value);
              }}
            />
            <span>
              <input
                type="checkbox"
                ref={checkboxRef}
                onChange={() => {
                  console.log(checkboxRef.current?.checked);
                }}
              />{" "}
              <span>Completed ?</span>
            </span>
            <button
              onClick={() => {
                taskData.length > 0
                  ? addData({
                    title: taskData,
                    completed: checkboxRef.current?.checked as boolean,
                  })
                  : alert("pls write something input box");
              }}
              className="py-2 px-4 rounded-md border-2"
            >
              addNewData
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ...

export default App;

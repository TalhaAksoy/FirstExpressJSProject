import axios from "axios";
import { Task } from "../types/Task";

const updateData = async (task: Task) => {
  console.log(`Task => ${task}`);
  try {
    const response = axios
      .put("http://localhost:3000/api/updateTask/" + task.id, task)
      .then(() => {
        console.log(response);
      });
  } catch (e) {
    console.log(`Update Data Error => ${e}`);
  }
};

export default updateData;

import axios from "axios";
import { Task } from "../types/Task";

const getData = async (url: string): Promise<Task[]> => {
  const response = await axios.get<Task[]>(url);

  console.log(response.statusText);
  if (response.statusText !== "OK") {
    throw new Error("Get Data Error => " + response.statusText);
  }
  return response.data;
};

export default getData;

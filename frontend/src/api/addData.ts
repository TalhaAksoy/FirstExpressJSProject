import axios from "axios";

const addData = async (props: { title: string; completed: boolean }) => {
  const task = {
    title: props.title,
    completed: props.completed,
  };

  console.log(task);

  try {
    const response = await axios.post(
      "http://localhost:3000/api/addTask",
      task,
    );
    console.log(response.data);
  } catch (e) {
    console.log(`Error => ${e}`);
  }

  console.log(`Title => ${props.title}`);
};

export default addData;

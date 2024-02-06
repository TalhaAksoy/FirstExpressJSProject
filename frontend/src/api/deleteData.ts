import axios from "axios";

const deleteData = async (id: number) => {
  console.log(id);

  try {
    const response = await axios
      .delete("http://localhost:3000/api/deleteTask/" + id)
      .then(() => {
        console.log(`Delete Response => ${response}`);
      });
  } catch (e) {
    console.log(`Delete Error => ${e}`);
  }
};

export default deleteData;

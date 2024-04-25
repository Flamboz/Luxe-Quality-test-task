import { getDataFromLocalStorate } from "./useFetch";

export default async function addData(data = []) {
  setDataToLocalStorate([...getDataFromLocalStorate(), data]);
}

const setDataToLocalStorate = (data) => {
  if (Array.isArray(data)) {
    localStorage.setItem("data", JSON.stringify(data));
  }
};

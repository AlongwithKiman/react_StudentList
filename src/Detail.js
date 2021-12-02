import react, { useContext } from "react";
import { StudentsDispatch } from "./App";
function Detail({ match }) {
  const { students, setStudents } = useContext(StudentsDispatch);
  const { name } = match.params;
  const student = students.find(student => student.name == name); // 선택된 애

  return <div>{student.name}</div>;
}

export default Detail;

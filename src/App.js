import React, { useState, useRef } from "react";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";

export const StudentsDispatch = React.createContext(null);

function App() {
  const nextId = useRef(3); // 왜 useState 에서는 nan 이 뜨냐.

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "abc",
      grade: "1",
      profile: "temp",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 2,
      name: "def",
      grade: "2",
      profile: "temp",
      selected: false,
      searched: false
    }
  ]);
  const manageStudent = { students, setStudents };
  return (
    <StudentsDispatch.Provider value={manageStudent}>
      <div>와플고등학교 명단 관리 프로그램</div>

      <StudentList></StudentList>
      <AddStudent nextId={nextId}></AddStudent>
    </StudentsDispatch.Provider>
  );
}

export default App;

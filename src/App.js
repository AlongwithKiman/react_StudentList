import React, { useState, useRef } from "react";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import "./App.css";
import "./ModalContainer";
import ModalContainer from "./ModalContainer";
export const StudentsDispatch = React.createContext(null);

function App() {
  const nextId = useRef(3); // 왜 useState 에서는 nan 이 뜨냐.

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "정광진",
      grade: "1",
      profile: "temp",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 2,
      name: "이기만",
      grade: "2",
      profile: "temp",
      selected: false,
      searched: false
    }
  ]);
  const manageStudent = { students, setStudents };
  return (
    <StudentsDispatch.Provider
      value={manageStudent}
      style={{ display: "flex" }}
    >
      <header>
        <h1>와플고등학교 명단 관리 프로그램</h1>
        <div>대시보드</div>
      </header>
      <main>
        <StudentList nextId={nextId}></StudentList>
      </main>
    </StudentsDispatch.Provider>
  );
}

export default App;

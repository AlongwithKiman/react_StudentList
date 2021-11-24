import React, { useContext, useState, useEffect } from "react";
import { StudentsDispatch } from "./App";
import produce from "immer";
export const editInput = React.createContext(null);

function StudentInfo({ student, onToggle, inputs, setInputs }) {
  const { name, grade, selected, id } = student;
  const [isListHover, setListHover] = useState(false);
  return (
    <li
      onMouseOver={() => setListHover(true)}
      onMouseOut={() => setListHover(false)}
      onClick={() => onToggle(student.id)}
      style={{ border: "1px solid black" }}
    >
      <b style={{ color: selected ? "black" : "green" }}>{name} </b>
      <span>{grade} </span>
      <span>{selected ? "선택됨" : isListHover ? "마우스올라옴" : ""}</span>
    </li>
  );
}

function StudentEdit({ inputs, setInputs }) {
  const { students, setStudents } = useContext(StudentsDispatch);

  const selectedStudent = students.find(student => student.selected);

  const { name, grade, profile } = inputs;

  const editStudent = () => {
    setStudents(
      students.map(student =>
        student.id === selectedStudent.id
          ? {
              name: name,
              grade: grade,
              profile: profile,
              selected: false,
              id: selectedStudent.id
            }
          : { ...student, selected: false }
      )
    );
  };

  const onChange = e => {
    const { value, name } = e.target; // 여기서 name은 위의 name 이 아니다.
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  if (!selectedStudent) return <div>학생 선택해라</div>;

  return (
    <>
      <input
        name="name"
        //value={selectedStudent.name}
        onChange={onChange}
      ></input>
      <input
        name="grade"
        //value={selectedStudent.grade}
        onChange={onChange}
      ></input>
      <input
        name="profile"
        //value={selectedStudent.profile}
        onChange={onChange}
      ></input>
      <button onClick={editStudent}>수정</button>
    </>
  );
}

function StudentList() {
  const [inputs, setInputs] = useState({
    name: "",
    grade: "",
    profile: ""
  });

  const [searcher, setSearcher] = useState("");

  const { students, setStudents } = useContext(StudentsDispatch);

  const onToggle = id => {
    setStudents(students =>
      students.map(student =>
        student.id === id
          ? { ...student, selected: true }
          : { ...student, selected: false }
      )
    );
  };

  return (
    <>
      <span>검색</span>
      <input
        onChange={e => {
          setSearcher(e.target.value);
        }}
      ></input>
      <div>
        <b>이름</b>
        <span>학년</span>
      </div>

      <ul>
        {students
          .filter(student => {
            if (searcher === "") {
              return student;
            } else if (
              student.name.toLowerCase().includes(searcher.toLowerCase())
            ) {
              return student;
            }
          })
          .map(student => (
            <StudentInfo student={student} onToggle={onToggle} />
          ))}
      </ul>

      <StudentEdit
        style={{ border: "1px solid black" }}
        inputs={inputs}
        setInputs={setInputs}
      ></StudentEdit>
      {/* <div style={{ border: "1px solid black" }}>
        학생 명단 hover 시 여기에 오른쪽 학생 정보 창
      </div> */}
    </>
  );
}

export default StudentList;

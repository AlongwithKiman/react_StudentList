import React, { useContext, useState, useEffect } from "react";
import { StudentsDispatch } from "./App";
import AddStudent from "./AddStudent";
import "./App.css";

export const editInput = React.createContext(null);

function InputForm({ text, name, defaultValue, onChange }) {
  return (
    <div>
      <span style={{ margin: "5px" }}>{text}</span>
      <input
        style={{ margin: "5px" }}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      ></input>
    </div>
  );
}

function StudentInfo({ student, onToggle, inputs, setInputs }) {
  const { name, grade, selected, id } = student;
  const [isListHover, setListHover] = useState(false);
  return (
    <li
      onMouseOver={() => setListHover(true)}
      onMouseOut={() => setListHover(false)}
      onClick={() => onToggle(student.id)}
    >
      <b style={{ color: selected ? "black" : "green" }}>{name} </b>
      <span>{grade} </span>
      {/* <span>{selected ? "선택됨" : isListHover ? "마우스올라옴" : ""}</span> */}
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

  const deleteStudent = id => {
    setStudents(students.filter(student => student.id !== id));
  };
  const onChange = e => {
    const { value, name } = e.target; // 여기서 name은 위의 name 이 아니다.
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  if (!selectedStudent)
    return (
      <div
        style={{
          textAlign: "center",
          height: "100px",
          lineHeight: "100px"
        }}
      >
        왼쪽 표에서 학생을 선택해 주세요
      </div>
    );

  return (
    <>
      <div className="buttons">
        <button onClick={editStudent}>저장</button>
        <button onClick={() => deleteStudent(selectedStudent.id)}>삭제</button>
      </div>
      <div style={{ border: "1px solid black" }}>여기 사진</div>
      <InputForm
        text="이름"
        name="name"
        defaultValue={name}
        onChange={onChange}
      ></InputForm>
      <InputForm
        text="학년"
        name="grade"
        defaultValue={grade}
        onChange={onChange}
      ></InputForm>
      <InputForm
        text="프로필"
        name="profile"
        defaultValue={profile}
        onChange={onChange}
      ></InputForm>
    </>
  );
}

function StudentList({ nextId }) {
  const [inputs, setInputs] = useState({
    name: "",
    grade: "",
    profile: ""
  });

  const [searcher, setSearcher] = useState("");

  const { students, setStudents } = useContext(StudentsDispatch);

  const onToggle = id => {
    const selectedStudent = students.find(student => student.id === id);
    setStudents(students =>
      students.map(student =>
        student.id === id
          ? { ...student, selected: true }
          : { ...student, selected: false }
      )
    );

    console.log(selectedStudent);
    setInputs({
      name: selectedStudent.name,
      grade: selectedStudent.grade,
      profile: selectedStudent.profile
    });
  };

  return (
    <>
      <div className="searcher">
        <span>검색</span>
        <input
          onChange={e => {
            setSearcher(e.target.value);
          }}
        ></input>
        <AddStudent nextId={nextId}></AddStudent>
      </div>

      <div className="manage">
        <div className="list">
          <ul>
            <li className="listTitle">
              <b>이름</b>
              <span>학년</span>
            </li>
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
        </div>

        <div className="edit">
          <StudentEdit inputs={inputs} setInputs={setInputs}></StudentEdit>
        </div>
      </div>
    </>
  );
}

export default StudentList;

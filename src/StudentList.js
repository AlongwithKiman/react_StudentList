import React, { useContext, useState, useEffect } from "react";
import { StudentsDispatch } from "./App";
import AddStudent from "./AddStudent";
import "./App.css";
import { placeholder } from "@babel/types";

export const editInput = React.createContext(null);

function InputForm({ text, name, value, onChange }) {
  return (
    <div>
      <div
        style={{
          margin: "5px",
          width: "10%",
          display: "inline-block",
          fontWeight: "bold"
        }}
      >
        {text}
      </div>
      <input
        style={{ margin: "5px", width: "80%", backgroundColor: "#ebf9fa" }}
        name={name}
        value={value}
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
      <b>{name} </b>
      <span>
        {grade}
        {selected ? (
          <img
            src="https://cdn.icon-icons.com/icons2/2248/PNG/512/arrow_left_box_icon_137939.png"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "5%"
            }}
          ></img>
        ) : isListHover ? (
          <img
            src="https://cdn.icon-icons.com/icons2/2248/PNG/512/arrow_right_bold_box_icon_135930.png"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "5%"
            }}
          ></img>
        ) : null}{" "}
      </span>

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
      <img
        src={selectedStudent.profile}
        style={{
          height: "50%",
          width: "40%",
          marginLeft: "30%",
          marginRight: "30%",
          marginTop: "3%",
          marginBottom: "3%"
        }}
      ></img>
      <div style={{ marginLeft: "10%", height: "30%" }}>
        <InputForm
          text="이름"
          name="name"
          value={inputs.name}
          onChange={onChange}
        ></InputForm>
        <InputForm
          text="학년"
          name="grade"
          value={inputs.grade}
          onChange={onChange}
        ></InputForm>
        <InputForm
          text="프로필"
          name="profile"
          value={inputs.profile}
          onChange={onChange}
        ></InputForm>
      </div>
    </>
  );
}

function StudentList({ nextId, onChange }) {
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

    setInputs({
      name: selectedStudent.name,
      grade: selectedStudent.grade,
      profile: selectedStudent.profile
    });

    // setInputs({
    //   name: "",
    //   grade: "",
    //   profile: ""
    // });
  };

  return (
    <>
      <div className="manage">
        <div className="list">
          <div className="searcher">
            <input
              placeholder="검색"
              onChange={e => {
                setSearcher(e.target.value);
              }}
            ></input>
            <AddStudent nextId={nextId}></AddStudent>
          </div>
          <ul style={{ overflow: "au" }}>
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

        <div className="verticalLine"></div>
        <div className="edit">
          <StudentEdit inputs={inputs} setInputs={setInputs}></StudentEdit>
        </div>
      </div>
    </>
  );
}

export default StudentList;

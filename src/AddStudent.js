import React, { useState, useContext } from "react";
import { StudentsDispatch } from "./App";
import Modal from "./Modal";
import "./App.css";
function AddStudent({ nextId, editInputs, seteditInputs }) {
  // editInputs : 오른쪽 에딧창 인풋 ( 생성했을 때 인풋값 변경 )
  //for modal

  const [inputs, setInputs] = useState({
    name: "",
    grade: "",
    profile: ""
  });

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setInputs({ name: "", grade: "", profile: "" });
    setModalOpen(false);
  };

  const { students, setStudents } = useContext(StudentsDispatch);

  const { name, grade, profile } = inputs;

  const onChange = e => {
    const { value, name } = e.target; // 여기서 name은 위의 name 이 아니다.
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onCreate = () => {
    if (name.length !== 2 && name.length !== 3) {
      window.alert("이름을 올바르게 입력해 주세요");
      return;
    } else if (grade != "1" && grade != "2" && grade != "3") {
      window.alert("학년을 올바르게 입력해 주세요");
      return;
    }
    const newStudent = {
      id: nextId.current,
      name,
      grade,
      profile,
      selected: true
    };

    setStudents(students.map(student => (student.selected = false)));

    setStudents([...students, newStudent]);
    setInputs({
      name: "",
      grade: "",
      profile: ""
    });
    seteditInputs({
      name: newStudent.name,
      grade: newStudent.grade,
      profile: newStudent.profile
    });
    nextId.current += 1;
    setModalOpen(false);
    console.log(nextId.current);
  };

  return (
    <>
      <button onClick={openModal} style={{ fontSize: "10px" }}>
        추가
      </button>
      <Modal
        open={modalOpen}
        close={closeModal}
        onCreate={onCreate}
        header="추가"
      >
        <div>
          <b>이름 </b>
          <input
            name="name"
            placeholder="이름"
            onChange={onChange}
            value={name}
          ></input>
        </div>

        <div>
          <b>학년 </b>
          <input
            name="grade"
            placeholder="학년"
            onChange={onChange}
            value={grade}
          ></input>
        </div>

        <div>
          <b>프로필 </b>
          <input
            name="profile"
            placeholder="프로필"
            onChange={onChange}
            value={profile}
          ></input>
        </div>
      </Modal>
    </>
  );
}

export default AddStudent;

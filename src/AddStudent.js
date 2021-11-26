import React, { useState, useContext } from "react";
import { StudentsDispatch } from "./App";
import Modal from "./Modal";
function AddStudent({ nextId }) {
  //for modal

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const { students, setStudents } = useContext(StudentsDispatch);

  const [inputs, setInputs] = useState({
    name: "",
    grade: "",
    profile: ""
  });
  const { name, grade, profile } = inputs;

  const onChange = e => {
    const { value, name } = e.target; // 여기서 name은 위의 name 이 아니다.
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onCreate = () => {
    const newStudent = {
      id: nextId.current,
      name,
      grade,
      profile
    };

    setStudents([...students, newStudent]);
    setInputs({
      name: "",
      grade: "",
      profile: ""
    });
    nextId.current += 1;

    setModalOpen(false);
    console.log(nextId.current);
  };

  return (
    <>
      <button onClick={openModal}>추가</button>
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

import react, { useContext } from "react";
import { StudentsDispatch } from "./App";
function Detail({ match }) {
  const { students, setStudents } = useContext(StudentsDispatch);
  const { name } = match.params;
  const student = students.find(student => student.name == name); // 선택된 애

  // return <div>{student.name}</div>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          class="detaildiv"
          style={{
            width: "97%",
            height: "50px",
            backgroundColor: "lightblue",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        ></div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", width: "97%" }}>
          <div
            class="detaildiv"
            style={{
              width: "50%",
              height: "600px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              class="detaildiv"
              style={{ flex: "2 1 0", backgroundColor: "lightgray" }}
            ></div>
            <div
              class="detaildiv"
              style={{ flex: "3 1 0", backgroundColor: "lightgreen" }}
            ></div>
          </div>
          <div
            class="detaildiv"
            style={{
              width: "50%",
              height: "600px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              class="detaildiv"
              style={{ flex: "1 1 0", backgroundColor: "lightgray" }}
            ></div>
            <div
              class="detaildiv"
              style={{ flex: "4 1 0", backgroundColor: "lightgreen" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;

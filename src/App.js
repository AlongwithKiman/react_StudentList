import React, { useState, useRef } from "react";
import StudentList from "./StudentList";
import AddStudent from "./AddStudent";
import { PieChart, Pie, Cell } from "recharts";
import "./App.css";
import "./ModalContainer";
import ModalContainer from "./ModalContainer";
export const StudentsDispatch = React.createContext(null);

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "깃허브",
      grade: 1,
      profile:
        "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 2,
      name: "빈학생",
      grade: 1,
      profile: "",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 3,
      name: "리액트",
      grade: 2,
      profile:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 4,
      name: "스벨트",
      grade: 2,
      profile:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 5,
      name: "리덕스",
      grade: 3,
      profile:
        "https://raw.githubusercontent.com/1ambda/1ambda.github.io/master/assets/images/redux/redux_logo.png?width=30%&height=30%",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 6,
      name: "타스",
      grade: 3,
      profile:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 7,
      name: "싸쓰",
      grade: 3,
      profile:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 8,
      name: "정광진",
      grade: "1",
      profile:
        "https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75",
      selected: false,
      searched: false // 검색됨?
    },
    {
      id: 9,
      name: "이기만",
      grade: "2",
      profile:
        "https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75",
      selected: false,
      searched: false
    }
  ]);

  // DATA FOR PIECHART

  const studentData = [
    {
      name: "1학년",
      value: students.filter(student => student.grade == "1").length
    },
    {
      name: "2학년",
      value: students.filter(student => student.grade == "2").length
    },
    {
      name: "3학년",
      value: students.filter(student => student.grade == "3").length
    }
  ];

  const COLORS = ["red", "blue", "yellow"];

  const renderLabel = entry => {
    return `${entry.name}(${entry.value})`;
  };
  // FOR DEBUG

  const debug = () => {
    //    console.log(students.map(student => [student.name, student.selected]));
    console.log(studentData.map(data => data.value));
  };

  const nextId = useRef(students.length + 1); // 왜 useState 에서는 nan 이 뜨냐.

  const manageStudent = { students, setStudents };
  return (
    <StudentsDispatch.Provider
      value={manageStudent}
      style={{ display: "flex" }}
    >
      <header>
        <div
          className="container"
          style={{ justifyContent: "left", marginLeft: "2%", marginTop: "1%" }}
        >
          <a href="http://wafflestudio.com">
            <img src="https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=256&q=75"></img>
          </a>

          <h1>와플고등학교 명단 관리 프로그램</h1>
        </div>
        <div className="container">
          <div>
            <PieChart
              width={150}
              height={150}
              style={{ position: "absolute", right: "5%" }}
            >
              <Pie
                data={studentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={30}
                fill={["blue", "red", "yellow"]}
                label={renderLabel}
              >
                {studentData.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </header>
      <main>
        <StudentList nextId={nextId}></StudentList>
      </main>
      <button onClick={debug}> debug</button>
    </StudentsDispatch.Provider>
  );
}

export default App;

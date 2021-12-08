import react, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import { StudentsDispatch } from "./App";

function InputForm({ text, name, value, onChange, disabled,isMajor=false }) {
  return (
    <div style={{ width:'60%', margin:'1%'}} >
      <div
        style={{
          marginRight: "15px",
          display: "inline-block",
          fontWeight: "bold",
          width:'20%'
        }}
      >
        {text}
      </div>
      {isMajor? 
      <select
        style={{ margin: "5px", width: "70%", backgroundColor: "#ebf9fa", borderWidth:'2px', borderStyle:'inset', padding:'1px 2px' }}
        name={name}
      >
        <option value="frontend"> frontend </option>
        <option value="backend"> backend </option>
        <option value="android"> android </option>
        <option value="iOS"> iOS </option>
        <option value="design"> design </option>
      </select>
      :<input
        style={{ margin: "5px", width: "70%", backgroundColor: "#ebf9fa", boxSizing:'border-box' }}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      ></input>}
      
    </div>
  );
}

function Detail({ match }) {
  const { students, setStudents } = useContext(StudentsDispatch);
  const { name } = match.params;
  const student = students.find(student => student.name == name); // 선택된 애
  // return <div>{student.name}</div>;
  const [inputs, setInputs] = useState({
    name: student.name,
    grade: student.grade,
    profile: student.profile,
    phoneNumber: student.phoneNumber,
    email: student.email,
    major: student.major
  });

  const onChange = e => {
    const { value, name } = e.target; // 여기서 name은 위의 name 이 아니다.    
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const getEmailFront = email =>{
    return email.split('@')[0]
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>  
        <div  // #1
          class="detaildiv"
          style={{
            width: "97%",
            height: "50px",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        >
          <div style={{width:'fit-content', marginTop:'0.8%', marginLeft:'1.5%'}}>
            <Link to ='/'>
              <b style={{color:'black'}}>⇦ 학생 목록 페이지로</b>
            </Link>
          </div>
          
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", width: "97%" }}>
          <div
            class="detaildiv"
            style={{
              width: "50%",
              height: "650px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div // #2
              class="detaildiv"
              style={{ flex: "2 1 0",  display: 'flex' }}
            >
              <div style={{flex:"1 1 0", display:'flex', justifyContent:'center',alignItems:'center'}}>
                <img src = {student.profile} alt = '' style={{width:'70%', height:'80%'}}></img>
              </div>
              <div style = {{flex:'1 1 0', display:'flex', justifyContent:'center', flexDirection:'column'}}>
                <div style={{marginLeft:'10%'}}>
                  <div>
                    <b style={{marginRight:'5%'}}>이름</b>
                    <span>{student.name}</span>  
                  </div>  
                  <div>
                    <b style={{marginRight:'5%'}}>학년</b>
                    <span>{student.grade}</span>  
                  </div>  
                </div>
                
              </div>          

            </div>
            <div  // #3
              class="detaildiv"
              style={{ flex: "3 1 0" }}
            >
            <div style={{backgroundColor:'lightgray',width:'10%', height:'8%', marginLeft:"4%", marginTop:'4%', display:'flex',justifyContent:'center',alignItems:'center' }}>
               <b>정보</b>
            </div>  
            <div style={{border:'2px solid black', width:'80%',height:'75%',marginLeft:'4%'}}>

            <div style={{ display:'flex',flexDirection:'column', alignItems:'center',marginTop:'4%'}}>
              <InputForm
                text="전화번호"
                name="phoneNumber"  //phoneNumber
                value={inputs.phoneNumber}
                onChange={onChange}
                disabled={false}
              ></InputForm> 
              <InputForm
                text="이메일"
                name="email"  //phoneNumber
                value={getEmailFront(inputs.email) + '@waffle.hs.kr'}
                onChange={onChange}
                disabled={false}
              ></InputForm> 
                          <InputForm
                text="전공"
                name="major"  //phoneNumber
                value={inputs.major}
                onChange={onChange}
                disabled={false}
                isMajor={true}
              ></InputForm> 
                          <InputForm
                text="프로필"
                name="profile"  //phoneNumber
                value={inputs.profile}
                onChange={onChange}
                disabled={false}
              ></InputForm> 
            </div>
            </div>
            </div>
          </div>
          <div
            class="detaildiv"
            style={{
              width: "50%",
              height: "650px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div  // #4
              class="detaildiv"
              style={{ flex: "1 1 0" }}
            >
              <div style={{width:'40%', display:'flex', float:'right', justifyContent:'space-between',marginTop:'3%',marginRight:"4%"}}>
                <button>
                  <img>
                  </img>
                  <span>잠금</span>
                </button>
                <button>
                  <img>
                  </img>
                  <span>삭제</span>
                </button>
                <button>
                  <img>
                  </img>
                  <span>저장</span>
                </button>
              </div>


            </div>
            <div  // #5
              class="detaildiv"
              style={{ flex: "4 1 0" }}
            >
              <div style={{backgroundColor:'lightgray',width:'10%', height:'6%', marginLeft:"6%", marginTop:'2%', display:'flex',justifyContent:'center',alignItems:'center' }}>
                <b>코멘트</b>
              </div>  
              <div style={{border:'2px solid black', width:'90%',height:'85%',marginLeft:'6%'}}>

              <div style={{ display:'flex',flexDirection:'column', alignItems:'center',marginTop:'4%'}}>
              
              </div>
            </div>




            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;

import './App.css';
import { useState } from 'react';
import Axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

function App() {
  
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [startdate, setStartdate] = useState("");
  
  const [newEmail, setNewEmail] = useState("");
  
  const [employeeList, setEmployeeList] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  


  const addEmployee = () => {
    
    Axios.post("http://localhost:3001/create", {
      name: name, 
      department: department,
      position: position, 
      email: email,
      mobilenumber: mobilenumber, 
      startdate: startdate,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name, 
          department: department,
          position: position, 
          email: email,
          mobilenumber: mobilenumber, 
          startdate: startdate,
        }
      ])
    });
  };

  const Players = [
    {name: name, department: department, position: position, email: email, mobilenumber: mobilenumber, startdate: startdate},
  ]

  const renderEmployees = (employee, index) =>{
  return(
    <tr key={index}>
      <td>{employee.name}</td>
      <td>{employee.department}</td>
      <td>{employee.position}</td>
      <td>{employee.email}</td>
      <td>{employee.mobilenumber}</td>
      <td>{employee.startdate}</td>
      <td>{<div><input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewEmail(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeEmail(employee.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(employee.id);
                  }}
                >
                  Delete
                </button></div>}</td>
                </tr>
    )
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeEmail = (id) => {
    Axios.put("http://localhost:3001/update", { email: newEmail, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  department: val.department,
                  position: val.position,
                  email: newEmail,
                  mobilenumber: val.mobilenumber,
                  startdate: val.startdate,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && department && position && email && mobilenumber && startdate){
      setValid(true);
    }
    setSubmitted(true);
  }

  return (
    <div className="App">
     <form className="Form" onSubmit={handleSubmit}>
      {submitted && valid ? <div class="success-message">Employee Successfully Added</div> : null}
     <input
          class="form-field"
          type="text"
          placeholder="Name"
          
          onChange={(event) => {
            setName(event.target.value);
          }}
          
        />
        {submitted && !name ? <span> You must enter a name </span> : null}
        
      <input
          class="form-field"
          type="text"
          placeholder="Department"
          onChange={(event) => {
            setDepartment(event.target.value);
          }}
        />
         {submitted && !department ? <span> You must enter a department </span> : null}
      <input
          class="form-field"
          type="text"
          placeholder="Position"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
         {submitted && !position ? <span> You must enter a position </span> : null}
      <input
          class="form-field"
          type="text"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
      />
       {submitted && !email ? <span> You must enter a email address </span> : null}
      <input
          class="form-field"
          type="text"
          placeholder="Phone #"
          onChange={(event) => {
            setMobilenumber(event.target.value);
          }}
      />
       {submitted && !mobilenumber ? <span> You must enter a phone number </span> : null}
      <input
          class="form-field"
          type="text"
          placeholder="Start Date"
          onChange={(event) => {
            setStartdate(event.target.value);
          }}
      />
       {submitted && !startdate ? <span> You must enter a start date </span> : null}
      
      
      <button class="form-field" type="submit" onClick={addEmployee}>Add Employee</button>
      <button class="form-field" onClick={getEmployees}>Show Employees</button>
      </form>
      
        <div className="Attributes">
                <table class = "table table-hover table-dark">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Email</th>
                      <th>Phone#</th>
                      <th>Start Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                <tbody>
                  {employeeList.map(renderEmployees)}
                </tbody>
                </table>
    

      </div>
    </div>
  );
}

export default App;
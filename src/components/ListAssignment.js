import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 
  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
      .then((response) => response.json())
      .then((data) => {
        console.log("assignment length " + data.length);
        if (Array.isArray(data)) {
          setAssignments(data);
        } else {
          console.error("Data is not an array:", data);
          setMessage("Error: Data is not in the expected format.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error: Failed to fetch assignments.");
      });
  };
  
  
  const deleteAssignment = (id) => {
    

    console.log();
    console.log("console",id);

    let forceString = '';
    if(document.getElementById('force').checked){
      forceString = "?force=true";
    }
    
    fetch(`${SERVER_URL}/assignmentDelete/${id}` + forceString, {
      method: 'DELETE',

    })
      // // .then((response) => response.json())
      // .then((data) => {
      //   console.log(data.message); 
      // })
      .catch((err) => {
        console.error(err);
        setMessage('Error: Failed to delete assignment.');
      });


      window.location.reload();
  };
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ''];
    for(let i = 0; i < assignments.length; i++){
      console.log(assignments[i].id, " ");
    }
    
    
    return (
      <div>
        <h3>Assignments</h3>


        <Link to="/addAssignment">
          <button variant="outlined" color="secondary" style={{ margin: 10 }}>
            Add Assignment
          </button>
          
        </Link>
        
        <br/>
        Force delete?
        <br/>
        <input type="checkbox" id="force" name="force" value="true"/>

        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                      </td>
                      <td> <Link to= {`/editAssignment/${assignments[idx].id}`}>Edit </Link></td>

                      <td><a href="#" onClick={() => deleteAssignment(assignments[idx].id)}>Delete</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
      </div>
    )
}  

export default ListAssignment;
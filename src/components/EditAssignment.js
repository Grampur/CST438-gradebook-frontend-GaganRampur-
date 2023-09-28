import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function EditAssignment(props) {

  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  let assignmentId = 0;

  const path = window.location.pathname;  // /gradebook/123
  console.log("path", path);
  const s = /\d+$/.exec(path)[0];
  console.log("s", s);
  console.log("Grade assignmentId="+s);
  assignmentId=s;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${SERVER_URL}/assignmentUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            assignmentName: assignmentName,
            dueDate: dueDate,
            id: assignmentId
            // courseTitle: "BUS 203 - Financial Accounting",
            // courseId: courseId
          })
      });

      console.log(response);
  
      if (response.ok) {
        // const responseData = response.json();
        console.log('Assignment edit successfully:');
        
        window.history.back();
      } else {
        alert('Failed to edit assignment:', response.status, response.statusText);
      }
    } catch (error) {
      alert('Network error:', error);
    }
  
    
    setAssignmentName('');
    setDueDate('');

  };

  return (
    <div>
      <h2>Edit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="assignmentName">Assignment Name:</label>
          <input
            type="text"
            id="assignmentName"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date (yyyy-mm-dd):</label>
          <input
            type="text"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </div>

        <button type="submit">Edit Assignment</button>
      </form>
    </div>
  );
}

export default EditAssignment;

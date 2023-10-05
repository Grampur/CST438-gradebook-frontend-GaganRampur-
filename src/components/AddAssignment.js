import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function AddAssignment(props) {

  const [courseId, setCourseId] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newAssignment = {
      courseId,
      assignmentName,
      dueDate,
    };
  
    try {
      const response = await fetch(`${SERVER_URL}/assignmentCreate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: Math.random(),
            assignmentName: assignmentName,
            dueDate: dueDate,
            // courseTitle: "BUS 203 - Financial Accounting",
            courseId: courseId
          })
      });

      console.log(response);
  
      if (response.ok) {
        const responseData = response.json();
        console.log('Assignment added successfully:', responseData);
        window.history.back();
      } else {
        alert('Failed to add assignment: ' + response.status);
      }
    } catch (error) {
      alert('Network error:', error);
    }
  
    setCourseId('');
    setAssignmentName('');
    setDueDate('');

    
  };

  return (
    <div>
      <h2>Add Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="courseId">Course ID:</label>
          <input
            type="text"
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
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

        <button type="submit">Add Assignment</button>
      </form>
    </div>
  );
}

export default AddAssignment;

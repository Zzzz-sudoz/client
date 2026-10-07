import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const [editingId, setEditingId] = useState(null);

  const getStudents = () => {
    axios.get("http://localhost:5000/students").then((response) => {
      setStudents(response.data);
    });
  };
  useEffect(() => {
    getStudents();
  });

  const handleSubmit = () => {
    const studentData = {
      name: name,
      course: course,
      age: age,
    };

    if (editingId) {
      axios
        .put(`http://localhost:5000/students/${editingId}`, studentData)
        .then(() => {
          getStudents();
          setName("");
          setCourse("");
          setAge("");
          setEditingId(null);
        });
    } else {
      axios.post("http://localhost:5000/students", studentData)
      .then(() => {
        getStudents();
        setName("");
        setCourse("");
        setAge("");
      });
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setEditingId(student._id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`).then(() => {
      getStudents();
    });
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <h2></h2>

      <label>Name: </label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <br />
      <label>Course: </label>
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
      />

      <br />
      <label>Age: </label>
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />
      <br />
      <br />

      <button onClick={handleSubmit}>
        {editingId ? "Update Student" : "Add Student"}
      </button>

      <br />
      <br />
      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
          <hr />
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>

          <button onClick={() => handleEdit(student)}>Edit</button>
          <button onClick={() => handleDelete(student._id)}>Delete</button>
          <hr />
        </div>
      ))}

      {/* {students.map((student) => (
          <div key={student.id}>
            <p>Name: {student.name}</p>
            <p>Course: {student.course}</p>
            <p>Age: {student.age}</p>
        </div>
      ))} */}
    </div>
  );
}

export default App;

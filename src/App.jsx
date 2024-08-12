import { useState } from "react";
import AddTodo from "./AddTodo";
import './Style.css';

function App() {
  const [input, setInput] = useState("");
  const [age, setAge] = useState("");
  const [array, setArray] = useState([]);

  const userInfo = {
    name: input,
    age: age,
  };

  const changedHandler = (e) => {
    setInput(e.target.value);
  };

  const ageChangedHandler = (e) => {
    setAge(e.target.value);
  };

  const clickHandler = () => {
    if (input.trim() === "" || age.trim() === "") {
      return;
    }
    setArray((prev) => {
      return [...prev, userInfo];
    });
    setInput("");
    setAge("");
  };

  const deleteItems = (id) => {
    setArray((prevArr) => {
      return prevArr.filter((index) => index !== id);
    });
  };

  const updateItem = (id, updatedName, updatedAge) => {
    const updatedArray = array.map((item, index) =>
      index === id ? { ...item, name: updatedName, age: updatedAge } : item
    );
    setArray(updatedArray);
  };

  return (
    <div className="app-container">
      <h1 style={{ textShadow: '1px 4px 1px grey' }}>CRUD APP</h1>
      <label htmlFor="name">Name:
        <input
          type="text"
          value={input}
          onChange={changedHandler}
          placeholder="Enter the text"
          className="app-input" 
        />
      </label>
      <label htmlFor="">Age:
        <input
          type="number"
          value={age}
          onChange={ageChangedHandler}
          placeholder="Enter the age"
          className="app-input"
        />
      </label>
      <button onClick={clickHandler} className="app-button">Add Item</button>

      {array.length > 0 && (
        <table className="todo-table" style={{ border: '1px solid black', marginTop: '20px' }}>
          <caption style={{ marginBottom: '10px', fontWeight: 'Bold' }}>User Management</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {array.map((item, index) => (
              <AddTodo
                text={item}
                key={index}
                id={index}
                onSelect={deleteItems}
                onUpdate={updateItem}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

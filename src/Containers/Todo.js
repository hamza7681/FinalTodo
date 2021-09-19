import React, { useEffect, useState } from "react";
import { GoPlus, MdDelete } from "react-icons/all";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase_config";
import "./style.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        task: input,
        date: new Date().toLocaleDateString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setInput("");
  };

  useEffect(() => {
    readTodos();
  }, [todos]);
  const readTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    let documents = [];
    querySnapshot.forEach((doc) => {
      let todo = doc.data();
      todo.id = doc.id;
      documents.push(todo);
      // console.log(`${doc.id} => ${doc.data()}`);
    });

    setTodos((t) => {
      return [...documents];
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    console.log("Row has been deleted");
  };

  return (
    <>
      <div className="container main">
        <h3 style={{ fontWeight: "bold", paddingTop: "8%" }}>Todo App</h3>
        <form noValidate>
          <input
            className="input_field"
            id="todo"
            label="Enter ToDo"
            name="todo"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <i
            type="submit"
            onClick={addTodo}
            disabled={!input}
            onChange={() => readTodos()}
            className="icon_box"
            placeholder="Add your new Todo"
          >
            <GoPlus className="icon1" />
          </i>
        </form>

        <div className="mt-4 task_div">
          {todos.map((todo) => {
            return (
              <ul key={todo.id} className="task">
                <li className="list_task">
                  {todo.task}
                  <i
                    aria-label="delete"
                    onClick={() => deleteTodo(todo.id)}
                    className="icon_box2"
                  >
                    <MdDelete className="icon2" />
                  </i>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Todo;

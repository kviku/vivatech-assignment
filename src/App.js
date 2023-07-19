
import './App.css';

import React, { useState } from "react";
import TodoList from "./Component/TodoList";
import "./App.css";

function App() {
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" }
      ]
    },
    { id: 2, title: "In Progress", cards: [{ id: 3, title: "Task 3" }] },
    { id: 3, title: "Done", cards: [{ id: 4, title: "Task 4" }] }
  ]);

  const addCard = (listId, cardTitle) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: [...list.cards, { id: Date.now(), title: cardTitle }]
          }
        : list
    );
    setLists(updatedLists);
  };

  const deleteCard = (listId, cardId) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
        : list
    );
    setLists(updatedLists);
  };

  const updateCard = (listId, cardId, newTitle) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: list.cards.map((card) =>
              card.id === cardId ? { ...card, title: newTitle } : card
            )
          }
        : list
    );
    setLists(updatedLists);
  };

  const moveCard = (card, sourceListId, targetListId) => {
    const sourceList = lists.find((list) => list.id === sourceListId);
    const targetList = lists.find((list) => list.id === targetListId);

    const updatedSourceList = {
      ...sourceList,
      cards: sourceList.cards.filter((c) => c.id !== card.id)
    };
    const updatedTargetList = {
      ...targetList,
      cards: [...targetList.cards, card]
    };

    const updatedLists = lists.map((list) =>
      list.id === sourceListId ? updatedSourceList : list
    );
    setLists(
      updatedLists.map((list) =>
        list.id === targetListId ? updatedTargetList : list
      )
    );
  };

  // Export data to Excel
  const exportToExcel = () => {
    const XLSX = require("xlsx");
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      lists.flatMap((list) => list.cards),
      { header: ["id", "title"] }
    );
    XLSX.utils.book_append_sheet(workbook, worksheet, "Todos");
    XLSX.writeFile(workbook, "todos.xlsx");
  };

  return (
    <div className="App">
      <h1>Task Management</h1>
      {lists.map((list) => (
        <TodoList
          key={list.id}
          list={list}
          addCard={addCard}
          deleteCard={deleteCard}
          updateCard={updateCard}
          moveCard={moveCard}
        />
      ))}
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
}

export default App;
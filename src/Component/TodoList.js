import React, { useState } from "react";
import TodoCard from "./TodoCard";

function TodoList({ list, addCard, deleteCard, updateCard, moveCard }) {
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleAddCard = () => {
    if (newCardTitle.trim() !== "") {
      addCard(list.id, newCardTitle);
      setNewCardTitle("");
    }
  };

  return (
    <div className="todo-list">
      <h2>{list.title}</h2>
      <div className="cards">
        {list.cards.map((card) => (
          <TodoCard
            key={card.id}
            card={card}
            deleteCard={deleteCard}
            updateCard={updateCard}
            moveCard={moveCard}
            listId={list.id}
          />
        ))}
      </div>
      <div className="add-card">
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
}

export default TodoList;

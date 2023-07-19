import React, { useState } from "react";

function TodoCard({ card, deleteCard, updateCard, moveCard, listId }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);

  const handleDeleteCard = () => {
    deleteCard(listId, card.id);
  };

  const handleUpdateCard = () => {
    if (newTitle.trim() !== "") {
      updateCard(listId, card.id, newTitle);
      setEditing(false);
    }
  };

  return (
    <div className="todo-card">
      {editing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleUpdateCard}>Save</button>
        </div>
      ) : (
        <div>
          <p>{card.title}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDeleteCard}>Delete</button>
          <button onClick={() => moveCard(card, listId, listId + 1)}>
            Move to Next List
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoCard;
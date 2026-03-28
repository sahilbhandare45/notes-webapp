import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);

  function fetchNotes() {
    axios.get("https://notes-webapp-fute.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("https://notes-webapp-fute.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeleteNote(noteId) {
    axios.delete("https://notes-webapp-fute.onrender.com/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleUpdateNote(e) {
    e.preventDefault();
    const { title, description } = e.target.form.elements;
    axios
      .patch("https://notes-webapp-fute.onrender.com/api/notes/" + editingNoteId, {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes()
      });
  }

  function handleEdit(note){
    document.querySelector("input[name='title']").value = note.title
    document.querySelector("textarea[name='description']").value = note.description
    setEditingNoteId(note._id)
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" />
        <textarea name="description"></textarea>
        <button>Create Note</button>
        <button onClick={handleUpdateNote}>Update Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            <div className="btns">
                            <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  handleEdit(note);
                }}
              >
                Edit Note
              </button>
            </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;

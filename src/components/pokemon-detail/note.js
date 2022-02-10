import React from "react";

const Note = ({ note }) => {
    return (
        <div className="note-wrapper">
            <span className="username">{note.user.username}</span>
            <p>{note.content}</p>
        </div>
    );
};

export default Note;

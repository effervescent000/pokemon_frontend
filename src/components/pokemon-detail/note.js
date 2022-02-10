import React from "react";

const Note = ({ note }) => {
    return (
        <div className="note-wrapper">
            <div className="note-header">
                <span className="username">{note.user.username}</span>
            </div>

            <p>{note.content}</p>
        </div>
    );
};

export default Note;

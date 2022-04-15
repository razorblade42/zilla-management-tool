import "../NoteItem/NoteItem.css"
//import DeleteIcon from '@mui/icons-material/Delete';
import { useRef } from "react";
import { useAlert } from "react-alert";
//import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//import useOnClickOutside from 'use-onclickoutside'
import React from "react";
<link href="https://fonts.googleapis.com/css2?family=Reenie+Beanie&display=swap" rel="stylesheet" />;

function NoteItem(props) {
    //const [useinit, setUseinit] = React.useState(false);
    const [contextMenu, setContextMenu] = React.useState(null);
    //
    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const alert = useAlert();
    const authorInputRef = useRef(null);
    const textInputRef = useRef(null);
    const groupInputRef = useRef(null);
    // create an array of colors
    const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#bf6fff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fffffc"];
    let newNote = props.note;
    if (props.note.text === "") {
        // make it content editable
        //  textInputRef.current.setAttribute("contenteditable", "true");
        if (textInputRef.current) textInputRef.current.focus();
    }
    else if (props.note.author === "") {
        // make it content editable
        //authorInputRef.current.setAttribute("contenteditable", "true");
        if (authorInputRef.current) authorInputRef.current.focus();
    }
    else if (props.note.group === "") {
        // make it content editable
        // groupInputRef.current.setAttribute("contenteditable", "true");
        if (groupInputRef.current) groupInputRef.current.focus();
    }
    function handleChangeColor(event) {
        event.preventDefault();
        // take a random color index from the array of colors
        let colorIndex = Math.floor(Math.random() * colors.length);
        while (colorIndex === props.note.color) {
            colorIndex = Math.floor(Math.random() * colors.length);
        }
        // change the color of the note
        newNote.color = colorIndex;
        props.onEdit(newNote.key, newNote);
        setContextMenu(null);

    }
    function updateContent(i, data) {
        newNote.date = new Date().toISOString().slice(0, 10);

        if (i === 0) {
            newNote.author = data;
        }
        else if (i === 1) {
            newNote.text = data;
        }
        else if (i === 2) {
            alert.success("Note Saved!");
            newNote.group = data;

        }

        props.onEdit(newNote.key, newNote);

    }
    //useOnClickOutside(ref1, () => { props.onEdit(props.note.key, newNote) });
    // function to handle the delete of the note
    function onD(event) {
        event.preventDefault();
        props.onDelete(props.note.key);
        setContextMenu(null);

    }
    // // function to handle the edit of the note
    // function onE(event) {
    //     event.preventDefault();
    //     props.onEdit(props.note.key);
    // }
    function ondb0(event) {

        event.target.contentEditable = "true";
        authorInputRef.current.focus();
        // // make the content editable
        // if (evt.target.contentEditable === "true") {
        //     evt.target.contentEditable = "false";
        //     updateContent(2, evt.target.innerHTML);
        // }
        // else {
        //     evt.target.contentEditable = "true";
        //     evt.target.focus();
        // }

    }
    function ondb1(event) {

        event.target.contentEditable = "true";
        textInputRef.current.focus();
        // // make the content editable
        // if (evt.target.contentEditable === "true") {
        //     evt.target.contentEditable = "false";
        //     updateContent(2, evt.target.innerHTML);
        // }
        // else {
        //     evt.target.contentEditable = "true";
        //     evt.target.focus();
        // }

    }
    function ondb2(event) {

        event.target.contentEditable = "true";
        groupInputRef.current.focus();
        // // make the content editable
        // if (evt.target.contentEditable === "true") {
        //     evt.target.contentEditable = "false";
        //     updateContent(2, evt.target.innerHTML);
        // }
        // else {
        //     evt.target.contentEditable = "true";
        //     evt.target.focus();
        // }

    }

    return (

        <div className="note-inside">
            {/* <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Dashboard
            </Button> */}

            <div onContextMenu={handleContextMenu} style={{ backgroundColor: colors[props.note.color] }}
                className="notes-main" >
                <div className="notes-header">
                    <h2 ref={authorInputRef} onDoubleClick={ondb0} contentEditable='false' onBlur={() => updateContent(0, authorInputRef.current.innerText)}>{props.note.author}</h2>
                    <h2 >{props.note.date}</h2>
                </div>
                <p id="p" ref={textInputRef} onDoubleClick={ondb1} contentEditable='false' onBlur={() => updateContent(1, textInputRef.current.innerText)}>{props.note.text}</p>
                <div className="notes-footer">
                    <h2 ref={groupInputRef} onDoubleClick={ondb2} contentEditable='false' onBlur={() => updateContent(2, groupInputRef.current.innerText)}>{props.note.group}</h2>
                    {/* <div className="footer-icons">

                        <button onClick={onD}>
                            <DeleteIcon />
                        </button>
                    </div> */}
                </div>
            </div>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={onD}>Delete</MenuItem>
                <MenuItem onClick={handleChangeColor}>Change Color</MenuItem>
            </Menu>
        </div >

    );
}

export default NoteItem
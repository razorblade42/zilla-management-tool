import NoteItem from "../NoteItem/NoteItem"
import { useContext, useRef } from 'react';
import AllProjectsContext from '../../store/AllProjectcontext';
import { useState, useEffect } from "react";
// import SwipeableTemporaryDrawer from '../Drawer/Drawer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./NoteList.css"
import { v4 as uuid } from 'uuid';
import { useAlert } from "react-alert";
import Search from '../Search/Search';
import BasicSelect from '../Selector/Selector';
import { default as D } from 'react-draggable';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { reorderRows } from '../Reorder/Reorder';
import Selecto from "react-selecto";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
function NoteList(props) {
    const [contextMenu, setContextMenu] = useState(null);
    const allProjectCtx = useContext(AllProjectsContext);
    const alert = useAlert();
    //find the project having key = props.k
    const project = allProjectCtx.AllProjects.filter(p => p.key === props.k)[0];
    //console.log(project);
    const notes = project.notes;
    const id = props.k;
    const initialsort = project.sortingOrder;
    //function to delete a note from the project
    const [searchText, setSearchText] = useState('');
    //create a usestate to check if it is sorted groupwise or not
    const [grouped, setGrouped] = useState(false);
    // create an object which contains lists of notes grouped by "group"
    const [noteByGroup, setNotebyGroup] = useState([]);
    const [scrollOptions, setScrollOptions] = useState({});
    const selectoRef = useRef(null);
    const scrollerRef = useRef(null);
    const newGroupInputRef = useRef(null);
    const [selectedNotes, setSelectedNotes] = useState([]);



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
    function onD(event) {
        setContextMenu(null);
        event.preventDefault();

        for (let i = 0; i < selectedNotes.length; i++) {
            allProjectCtx.removeNote(project.key, selectedNotes[i]);
        }
        setSelectedNotes([]);


    }
    function handleChangeGroup(event) {
        event.preventDefault();
        for (let i = 0; i < selectedNotes.length; i++) {
            //createa a new note with the same content as the selected note
            //find the note in the project having key = selectedNotes[i]
            const curNote = notes.filter(n => n.key === selectedNotes[i])[0];
            let newNote = {
                key: curNote.key,
                group: newGroupInputRef.current.value,
                author: curNote.author,
                //update the date
                date: new Date().toISOString().slice(0, 10),
                text: curNote.text,
                color: curNote.color,
            }
            //update the note in the project
            allProjectCtx.changeNote(project.key, selectedNotes[i], newNote);

        }
        setSelectedNotes([]);
    }

    console.log(selectedNotes);
    useEffect(() => {
        setScrollOptions({
            container: scrollerRef.current,
            throttleTime: 30,
            threshold: 0,
        });
    }, []);
    useEffect(() => {
        //make a list of objects with group as key and list of notes as value
        const noteByGroup = [];
        const groups = []
        notes.map((note) => {
            //if group already exists in groups
            if (!groups.includes(note.group)) {
                //add group to groups
                groups.push(note.group);
            }
            return groups;
        });
        //traverse through groups
        groups.map((group) => {
            //make a list of notes with the same group
            const notesByGroup = notes.filter((note) => note.group === group);
            //add group and notes to noteByGroup
            noteByGroup.push({
                id: group,
                values: notesByGroup,
            });

            return noteByGroup;
        });

        // console.log(noteByGroup);
        // console.log(groups);
        setNotebyGroup(noteByGroup);
    }, [notes]);


    const reorderafterdrag = (notebyGroupAfterDrag) => {
        const newnotes = []
        //iterate over notebyGroupAfterDrag
        notebyGroupAfterDrag.map((g) => {
            //iterate over group.values
            g.values.map((note) => {
                //add note to notes
                //check if note.group is same as g.id
                if (note.group === g.id) {
                    newnotes.push(note);
                }
                else {
                    //     key: "1",
                    // text: "moron comes tonight",
                    // author: "Himanshu",
                    // date: "2020-01-01",
                    // group: "facebook",
                    // color: 1,
                    //create a new note with same id and group as g.id
                    const newNote = {
                        key: note.key,
                        text: note.text,
                        group: g.id,
                        author: note.author,
                        date: note.date,
                        color: note.color,
                    };
                    newnotes.push(newNote);
                }
                return newnotes;
            });
            return newnotes;
        });
        allProjectCtx.changeNoteHandler(props.k, newnotes);
    }





    const groupedNotes = {};
    for (let i = 0; i < notes.length; i++) {
        if (groupedNotes[notes[i].group]) {
            groupedNotes[notes[i].group].push(notes[i]);
        } else {
            groupedNotes[notes[i].group] = [notes[i]];
        }
    }
    function deleteNote(notekey) {
        alert.success("Note Removed!");
        allProjectCtx.removeNote(props.k, notekey);
    }
    function editNote(noteKey, newNote) {
        allProjectCtx.changeNote(props.k, noteKey, newNote);
    }
    function AddNote(newNote) {
        allProjectCtx.addNote(props.k, newNote);
    }
    //create a function to get a random no out of {1,2}

    return (
        // length of notes
        notes.length > 0 ?
            grouped ?
                <DragDropContext
                    onDragEnd={({ destination, source }) => {
                        // // dropped outside the list
                        if (!destination) {
                            return;
                        }
                        console.log("destination", destination);
                        console.log("source", source);

                        reorderafterdrag(reorderRows(noteByGroup, source, destination));
                    }}
                >
                    <div>
                        <div className="notelist-header">

                            <h1>Showing All Notes of <b>{project.title}</b></h1>
                            <Search handleSearchNote={setSearchText} />
                            <div className="options">

                                {/* <SwipeableTemporaryDrawer projectKey={props.k} onAdd={AddNote} onEdit={editNote} onDelete={deleteNote} /> */}
                                <button title="Add New Note" size="large" onClick={() =>

                                    AddNote({
                                        key: uuid(),
                                        text: "",
                                        author: "",
                                        date: new Date().toISOString().slice(0, 10),
                                        group: "",
                                        // take a random number from 1 to 3
                                        color: Math.floor(Math.random() * 3) + 1,
                                    })}>
                                    <AddCircleOutlineIcon fontSize='large' />
                                </button>
                                <button title="Undo Group Highlights" size="large" style={{ color: "blue" }} onClick={() =>

                                    setGrouped(prev => {
                                        !prev ?
                                            alert.success("Grouped!") :
                                            alert.success("Ungrouped!");
                                        return !prev;
                                    })}>


                                    <PeopleSharpIcon fontSize='large' />
                                </button>
                            </div>
                        </div>
                        {
                            Object.keys(groupedNotes).map(group => (
                                <Droppable
                                    droppableId={group}
                                    direction="horizontal"
                                    isCombineEnabled={false}
                                >
                                    {dropProvided => (
                                        <div {...dropProvided.droppableProps}
                                            ref={dropProvided.innerRef}
                                            className="notes-list">
                                            {/* iterate over each group list of groupedNotes */}
                                            <h2 style={{ color: "blue" }}>{group}</h2>
                                            <ul>
                                                {
                                                    groupedNotes[group].filter((note) =>
                                                        note.text.includes(searchText) || note.author.includes(searchText) || note.group.includes(searchText) || note.date.includes(searchText)
                                                    ).map((note, index) => (
                                                        <Draggable key={note.key} draggableId={note.key} index={index}>
                                                            {dragProvided => (
                                                                <div
                                                                    {...dragProvided.dragHandleProps}
                                                                    {...dragProvided.draggableProps}
                                                                    ref={dragProvided.innerRef}
                                                                >
                                                                    <li className={note.color % 2 === 1 ? "tilt_1" : "tilt_2"} title="Double Click to Edit!">
                                                                        <NoteItem onEdit={editNote} onDelete={deleteNote} note={note} />
                                                                    </li>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {dropProvided.placeholder}
                                            </ul >

                                        </div>
                                    )}
                                </Droppable>
                            ))
                        }
                    </div >
                </DragDropContext>
                :
                <div>
                    <div className="notelist-header">

                        <h1>Showing All Notes of <b>{project.title}</b></h1>
                        <Search handleSearchNote={setSearchText} />
                        <div className="options">
                            <div className="selector">
                                <BasicSelect id={id} init={initialsort} />
                            </div>
                            {/* <SwipeableTemporaryDrawer projectKey={props.k} onAdd={AddNote} onEdit={editNote} onDelete={deleteNote} /> */}
                            <button title="Add New Note" size="large" onClick={() =>

                                AddNote({
                                    key: uuid(),
                                    text: "",
                                    author: "",
                                    date: new Date().toISOString().slice(0, 10),
                                    group: "",
                                    // take a random number from 1 to 3
                                    color: Math.floor(Math.random() * 3) + 1,
                                })}>
                                <AddCircleOutlineIcon fontSize='large' />
                            </button>
                            <button title="Group Highlights" size="large" onClick={() =>

                                setGrouped(prev => {
                                    !prev ?
                                        alert.success("Grouped!") :
                                        alert.success("Ungrouped!");
                                    return !prev;
                                })}>

                                <PeopleSharpIcon fontSize='large' />
                            </button>
                        </div>
                    </div>

                    <div className="notes-list " onContextMenu={handleContextMenu}>
                        <Selecto
                            ref={selectoRef}
                            dragContainer={".elements"}
                            selectableTargets={[".selecto-area .cube"]}
                            hitRate={20}
                            selectByClick={true}
                            selectFromInside={true}
                            toggleContinueSelect={["shift"]}
                            ratio={0}
                            scrollOptions={scrollOptions}
                            onDragStart={e => {
                                if (e.inputEvent.target.nodeName === "BUTTON") {
                                    return false;
                                }
                                return true;
                            }}
                            onSelect={e => {
                                e.added.forEach(el => {
                                    el.classList.add("selected");
                                    setSelectedNotes(prev => [...prev, el.id.split("*")[1]]);
                                });
                                e.removed.forEach(el => {
                                    el.classList.remove("selected");
                                    setSelectedNotes(prev => prev.filter(key => key !== el.id.split("*")[1]));
                                });
                            }}
                            onScroll={e => {
                                scrollerRef.current.scrollBy(e.direction[0] * 10, e.direction[1] * 10);
                            }}
                        ></Selecto>
                        <ul className="elements scroll selecto-area" id="selecto1" ref={scrollerRef} onScroll={() => {
                            selectoRef.current.checkScroll();
                        }}>

                            {
                                notes.filter((note) =>
                                    note.text.includes(searchText) || note.author.includes(searchText) || note.group.includes(searchText) || note.date.includes(searchText)
                                ).map((note, index) => (
                                    <D>
                                        <li key={note.key} id={`noteID*${note.key}`} className={note.color % 2 === 1 ? "tilt_1 cube" : "tilt_2 cube"} title="Double Click to Edit!">
                                            <NoteItem onEdit={editNote} onDelete={deleteNote} note={note} />
                                        </li>
                                    </D>
                                ))}
                        </ul >
                    </div>
                    <Menu
                        open={selectedNotes.length > 0 && contextMenu !== null}
                        onClose={handleClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                            contextMenu !== null
                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                : undefined
                        }
                    >
                        <MenuItem onClick={onD}>Delete Notes</MenuItem>
                        {/* create a text area to input new group name */}
                        <form onBlur={handleChangeGroup} onSubmit={handleChangeGroup}>
                            <input ref={newGroupInputRef} id="group-name" placeholder="Enter New Group Name" ></input>
                        </form>
                    </Menu>
                </div >
            :
            <div>
                <div className="notelist-header">
                    <h1>No Notes Found! Try Adding Some.</h1>
                    <div className="options">

                        {/* <SwipeableTemporaryDrawer projectKey={props.k} onAdd={AddNote} onEdit={editNote} onDelete={deleteNote} /> */}
                        <button title="Add New Note" size="large" onClick={() =>

                            AddNote({
                                key: uuid(),
                                text: "",
                                author: "",
                                date: new Date().toISOString().slice(0, 10),
                                group: "",
                                // take a random number from 1 to 3
                                color: Math.floor(Math.random() * 3) + 1,
                            })}>

                            <AddCircleOutlineIcon fontSize='large' />
                        </button>

                    </div>
                </div>


            </div>

    );
}

export default NoteList;
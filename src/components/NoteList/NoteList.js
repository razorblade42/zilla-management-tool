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

function NoteList(props) {
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
                                        group: "Default",
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
                    <Selecto
                        ref={selectoRef}
                        dragContainer={".elements"}
                        selectableTargets={[".selecto-area .tilt_1 .tilt_2"]}
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
                            });
                            e.removed.forEach(el => {
                                el.classList.remove("selected");
                            });
                        }}
                        onScroll={e => {
                            scrollerRef.current.scrollBy(e.direction[0] * 10, e.direction[1] * 10);
                        }}
                    ></Selecto>
                    <div className="elements scroll selecto-area" id="selecto1" ref={scrollerRef} onScroll={() => {
                        selectoRef.current.checkScroll();
                    }}>
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
                                        text: "Text",
                                        author: "Name",
                                        date: new Date().toISOString().slice(0, 10),
                                        group: "Group",

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

                        <div className="notes-list">
                            <ul>

                                {
                                    notes.filter((note) =>
                                        note.text.includes(searchText) || note.author.includes(searchText) || note.group.includes(searchText) || note.date.includes(searchText)
                                    ).map((note, index) => (
                                        <D>
                                            <li className={note.color % 2 === 1 ? "tilt_1" : "tilt_2"} title="Double Click to Edit!">
                                                <NoteItem onEdit={editNote} onDelete={deleteNote} note={note} />
                                            </li>
                                        </D>
                                    ))}
                            </ul >
                        </div>
                    </div >
                </div>
            :
            <div>
                <div className="notelist-header">
                    <h1>No Notes Found! Try Adding Some.</h1>
                    <div className="options">

                        {/* <SwipeableTemporaryDrawer projectKey={props.k} onAdd={AddNote} onEdit={editNote} onDelete={deleteNote} /> */}
                        <button title="Add New Note" size="large" onClick={() =>

                            AddNote({
                                key: uuid(),
                                text: "Text",
                                author: "Name",
                                date: new Date().toISOString().slice(0, 10),
                                group: "Group",
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
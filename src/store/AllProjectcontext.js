import { createContext, useState, useEffect } from 'react';
const projects = [
    {
        key: "1",
        title: "Project 1",
        description: "This is project 1",
        date: "2020-01-01",
        isFavourite: false,
        sortingOrder: 1,
        notes: [
            {
                key: "1",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "facebook",
                color: 1,
            },
            {
                key: "2",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "instagram",
                color: 2,
            },
            {
                key: "3",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
            {
                key: "4",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
        ]

    },
    {
        key: "2",
        title: "Project 2",
        description: "This is project 2",
        date: "2020-01-02",
        isFavourite: false,
        sortingOrder: 1,
        notes: [
            {
                key: "1",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "facebook",
                color: 1,
            },
            {
                key: "2",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "instagram",
                color: 2,
            },
            {
                key: "3",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
            {
                key: "4",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
        ]
    },
    // define a list of projects here
    {
        key: "3",
        title: "Project 3",
        description: "This is project 3",
        date: "2020-01-03",
        isFavourite: false,
        sortingOrder: 1,
        notes: [
            {
                key: "1",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "facebook",
                color: 1,
            },
            {
                key: "2",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "instagram",
                color: 2,
            },
            {
                key: "3",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
            {
                key: "4",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
        ]
    },
    {
        key: "4",
        title: "Project 4",
        description: "This is project 4",
        date: "2020-01-04",
        isFavourite: false,
        sortingOrder: 1,
        notes: [
            {
                key: "1",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "facebook",
                color: 1,
            },
            {
                key: "2",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "instagram",
                color: 2,
            },
            {
                key: "3",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
            {
                key: "4",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
        ]
    },
    {
        key: "5",
        title: "Project 5",
        description: "This is project 5",
        date: "2020-01-05",
        isFavourite: false,
        sortingOrder: 1,
        notes: [
            {
                key: "1",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "facebook",
                color: 1,
            },
            {
                key: "2",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "instagram",
                color: 2,
            },
            {
                key: "3",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
            {
                key: "4",
                text: "Have a Nice Day!",
                author: "Himanshu",
                date: "2020-01-01",
                group: "whatsapp",
                color: 3,

            },
        ]
    }
];
const AllProjectsContext = createContext({
    AllProjects: [],
    totalAllProjects: 0,
    add: (AllProject) => { },
    remove: (Projectkey) => { },
    removeNote: (Projectkey, noteKey) => { },
    changeNote: (Projectkey, noteKey, newNote) => { },
    addNote: (Projectkey, newNote) => { },
    switchFavorite: (Projectkey) => { },
    changeSortingOrder: (Projectkey, newSortingOrder) => { },
    changeNoteHandler: (Projectkey, newNotes) => { },
});

export function AllProjectsContextProvider(props) {
    const [userAllProjects, setUserAllProjects] = useState(projects);
    useEffect(() => {
        const userAllProjects = JSON.parse(localStorage.getItem('react-notes-app-data'));

        if (userAllProjects) {
            setUserAllProjects(userAllProjects);
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('react-notes-app-data', JSON.stringify(userAllProjects))
    }, [userAllProjects]);
    //function to change the favorite status of a project
    const switchFavoriteHandler = (Projectkey) => {
        const newProjects = userAllProjects.map((project) => {
            if (project.key === Projectkey) {
                project.isFavourite = !project.isFavourite;
            }
            return project;
        });
        setUserAllProjects(newProjects);
    }
    //function to replace notes of a project
    const changeNoteHandler = (Projectkey, newNotes) => {
        const newProjects = userAllProjects.map((project) => {
            if (project.key === Projectkey) {
                project.notes = newNotes;
            }
            return project;
        });
        setUserAllProjects(newProjects);
    }

    function addAllHandler(newProject) {
        setUserAllProjects((prevUserAllProjects) => {
            return prevUserAllProjects.concat(newProject);
        });
    }

    function removeAllHandler(Projectkey) {
        setUserAllProjects(prevUserAllProjects => {
            return prevUserAllProjects.filter(Project => Project.key !== Projectkey);
        });
    }
    //function to add a note to a project with key project key
    function addNoteHandler(Projectkey, newNote) {
        setUserAllProjects(prevUserAllProjects => {
            return prevUserAllProjects.map(Project => {
                if (Project.key === Projectkey) {
                    return {
                        ...Project,
                        //add newNote to the notes array at the front of the array
                        notes: [newNote, ...Project.notes]

                    }
                }
                return Project;
            });
        });
    }
    //function to remove a note from a project with key project key

    function removeNote(Projectkey, noteKey) {
        setUserAllProjects(prevUserAllProjects => {
            const updatedProjects = prevUserAllProjects.map(Project => {
                if (Project.key === Projectkey) {
                    return {
                        ...Project,
                        notes: Project.notes.filter(note => note.key !== noteKey)
                    }
                }
                return Project;
            });
            return updatedProjects;
        });
    }
    //create a function to updatea note

    function changeNote(Projectkey, noteKey, newNote) {
        setUserAllProjects(prevUserAllProjects => {
            const updatedProjects = prevUserAllProjects.map(Project => {
                if (Project.key === Projectkey) {
                    const updatedNotes = Project.notes.map(note => {
                        if (note.key === noteKey) {
                            return {
                                ...note,
                                ...newNote
                            }
                        }
                        return note;
                    });
                    return {
                        ...Project,
                        notes: updatedNotes
                    }
                }
                return Project;
            });
            return updatedProjects;
        });
    }
    function changeSortingOrderHandler(Projectkey, newSortingOrder) {
        setUserAllProjects(prevUserAllProjects => {
            const updatedProjects = prevUserAllProjects.map(Project => {
                if (Project.key === Projectkey) {
                    // if newSorting order is 1 then sort notes by date  and if newSorting order is 2 then sort notes by group name and if newSorting order is 0 then sort notes by author name
                    if (newSortingOrder === 1) {
                        console.log("sorting by date");
                        Project.notes.sort((a, b) => {
                            return new Date(b.date) - new Date(a.date);
                        });
                    }
                    else if (newSortingOrder === 2) {
                        console.log("sorting by group");
                        Project.notes.sort((a, b) => {
                            return a.group.localeCompare(b.group);
                        });
                    }
                    else {
                        Project.notes.sort((a, b) => {
                            console.log("sorting by author");
                            return a.author.localeCompare(b.author);
                        });
                    }
                    return {
                        ...Project,
                        sortingOrder: newSortingOrder

                    }
                }
                return Project;
            });

            return updatedProjects;
        });
    }

    const context = {
        AllProjects: userAllProjects,
        totalAllProjects: userAllProjects.length,
        add: addAllHandler,
        remove: removeAllHandler,
        removeNote: removeNote,
        changeNote: changeNote,
        addNote: addNoteHandler,
        switchFavorite: switchFavoriteHandler,
        changeSortingOrder: changeSortingOrderHandler,
        changeNoteHandler: changeNoteHandler,
    };

    return (
        <AllProjectsContext.Provider value={context}>
            {props.children}
        </AllProjectsContext.Provider>
    );
}

export default AllProjectsContext;

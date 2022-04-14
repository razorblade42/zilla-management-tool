import ProjectList from "../components/ProjectList/ProjectList";
import { useContext } from 'react';
import AllProjectsContext from '../store/AllProjectcontext';
import Search from '../components/Search/Search';
import { useState } from "react";
function AllProjects() {
    const allProjectCtx = useContext(AllProjectsContext);
    const [searchText, setSearchText] = useState('');
    const allP = allProjectCtx.AllProjects;
    return (
        allP.length > 0 ?
            <div>
                <h1> All Projects</h1>
                <Search handleSearchNote={setSearchText} />
                <ProjectList projects={allP.filter((project) =>
                    project.description.includes(searchText) || project.date.includes(searchText) || project.title.includes(searchText)
                )} />
            </div>
            :
            <div>
                <h1> No Projects</h1>
            </div>

    );
}

export default AllProjects;
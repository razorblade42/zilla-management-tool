import ProjectList from "../components/ProjectList/ProjectList";
import { useContext } from 'react';
import AllProjectsContext from '../store/AllProjectcontext';
import './Favourites.css';

function Favourites() {
    const allProjectCtx = useContext(AllProjectsContext);
    // filter all projects to get only those having isFavourite = true
    const favouriteProjects = allProjectCtx.AllProjects.filter(project => project.isFavourite);

    return (
        favouriteProjects.length > 0 ?
            <div>
                <h1>Showing All favourites</h1>
                <ProjectList projects={favouriteProjects} />
            </div>
            :
            <div className='nothing'>
                <h1>No Favourites</h1>
            </div>
    );
}
export default Favourites;
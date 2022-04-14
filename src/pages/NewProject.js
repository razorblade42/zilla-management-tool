import { useHistory } from 'react-router-dom';

import NewProjectForm from '../components/NewProjectForm/NewProjectForm';
import { useContext } from 'react';
import AllProjectsContext from '../store/AllProjectcontext';

function NewProject() {
    const history = useHistory();
    const allProjectCtx = useContext(AllProjectsContext);

    // let content;

    // if (favoritesCtx.totalFavorites === 0) {
    //     content = <p>You got no favorites yet. Start adding some?</p>;
    // } else {
    //     content = <MeetupList meetups={favoritesCtx.favorites} />;
    // }
    function addProjectHandler(Data) {
        allProjectCtx.add(Data);
        history.replace('/all-projects');
    }

    return (
        <section>
            <h1>Add New Project</h1>
            <NewProjectForm onAddProject={addProjectHandler} />
        </section>
    );
}

export default NewProject;

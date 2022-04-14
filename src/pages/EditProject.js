import { useHistory, useParams } from 'react-router-dom';

import EditProjectForm from '../components/NewProjectForm/EditProjectForm';
import { useContext } from 'react';
import AllProjectsContext from '../store/AllProjectcontext';


function EditProject() {
    const history = useHistory();
    const allProjectCtx = useContext(AllProjectsContext);
    // console.log(this.props.match.params);
    // const k = props.match.params.Projectkey;
    // find projectkey from url using useParams
    const { Projectkey } = useParams();
    // console.log(Projectkey);
    function editProjectHandler(Data, p) {
        // change Project
        //get the project 
        //remove the project having the key ProjectKey
        allProjectCtx.remove(p);
        //console.log(+p);
        allProjectCtx.add(Data);
        history.replace('/all-projects');
    }

    return (
        <section>
            <h1>Update Project Details</h1>
            <EditProjectForm allProjects={allProjectCtx.AllProjects} ke={Projectkey} onEditProject={editProjectHandler} />
        </section>
    );
}

export default EditProject;

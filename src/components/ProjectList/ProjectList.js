import ProjectItem from "../ProjectItem/ProjectItem"
import "./ProjectList.css"


function ProjectList(props) {
    return (
        <div className="project-list">
            <ul>
                {props.projects.map(project => (
                    <li>
                        <ProjectItem project={project} />
                    </li>

                ))}
            </ul >
        </div>



    );

}
export default ProjectList;
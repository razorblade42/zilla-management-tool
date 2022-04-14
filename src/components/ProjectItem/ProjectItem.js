
import "./ProjectItem.css"
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import AllProjectsContext from "../../store/AllProjectcontext";
import { Link } from 'react-router-dom';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useAlert } from "react-alert";
//import Button.css
import "../Button/Button.css";
function ProjectItem(props) {
    const history = useHistory();
    const allProjectCtx = useContext(AllProjectsContext);
    const alert = useAlert();
    function onclick(event) {
        console.log(props.project.key);
        event.preventDefault();
        allProjectCtx.remove(props.project.key);
        alert.success("Project Removed!");
        history.replace('/all-projects');
    }
    function bookmarkHandler(event) {
        event.preventDefault();
        props.project.isFavourite ? alert.success("Removed From Favourites!!") : alert.success("Added To Favourites!!");
        allProjectCtx.switchFavorite(props.project.key);
    }
    return (
        <div className="Item">
            <div className="Item__body">
                <div className="Item__body__header">
                    <h2 className="Item__title">{props.project.title}</h2>
                    <button onClick={bookmarkHandler}>
                        {props.project.isFavourite ? <BookmarkAddedIcon fontSize="large" style={{ color: "blue" }} /> : <BookmarkAddIcon fontSize="large" style={{ color: "#888" }} />}
                    </button>

                </div>

                <p className="Item__description">{props.project.description}</p>
                <h3 className="Item__date">{props.project.date}</h3>
            </div>
            <div className="Item_footer">
                <Link to={`/all-notes/${props.project.key}`}>
                    <button className='button-26'>
                        View Notes
                    </button>
                </Link>
                <Link to={`/edit-project/${props.project.key}`}>
                    <button className='button-26'>
                        Edit
                    </button>
                </Link>
                <button className="button-26" onClick={onclick}>Delete</button>
            </div>

        </div>
    );
}
export default ProjectItem;
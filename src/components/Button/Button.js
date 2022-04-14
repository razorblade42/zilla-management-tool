import { Link } from 'react-router-dom';
import './Button.css';
function Button(props) {
    return (
        <Link to={props.destination}>
            <button className='button-26'>
                {props.text}
            </button>
        </Link>
    );
}

export default Button;
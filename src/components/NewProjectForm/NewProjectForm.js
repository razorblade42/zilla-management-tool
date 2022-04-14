import { useRef } from "react";
import { v4 as uuid } from "uuid";
import classes from "./NewProjectForm.module.css";
import { TextField } from "@mui/material";
import { useAlert } from "react-alert";
function NewProjectForm(props) {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  // const [isDisabled, setDisabled] = useState(true);
  const alert = useAlert();
  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    if (enteredTitle.length === 0) {
      alert.error("Please enter a valid title");
      return;
    }
    if (enteredDescription.length === 0) {
      alert.error("Please enter a valid description");
      return;
    }
    console.log(enteredTitle);
    console.log(enteredDescription);
    const Data = {
      title: enteredTitle,
      description: enteredDescription,
      date: new Date().toISOString().slice(0, 10),
      key: uuid(),
      notes: [],
      isFavourite: false,
      sortingOrder: 1,
    };

    props.onAddProject(Data);
    alert.success("Project Added!");

  }

  return (
    <div className={classes["form-wrapper"]}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <TextField
            size="normal"
            fullWidth
            label="Project Title"
            id="ProjectTitle"
            inputRef={titleInputRef}
          />
          <div className={classes.t}></div>
          <TextField
            size="normal"
            id="outlined-textarea"
            label="Description"
            multiline
            fullWidth
            inputRef={descriptionInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button  >Add Project</button>
        </div>
      </form >
    </div >
  );
}

export default NewProjectForm;

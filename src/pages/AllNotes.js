import NoteList from "../components/NoteList/NoteList";
import { useParams } from "react-router-dom";

function AllNotes() {
  const { Projectkey } = useParams();
  return <NoteList k={Projectkey} />;
}
export default AllNotes;

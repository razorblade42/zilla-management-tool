import "./Home.css";
import sticky from "../assets/sticky.png";

import Button from "../components/Button/Button";
function Home() {
  return (
    <div className="wrapper">
      <div className="main-home">
        <div className="main-context">
          <h1>ZILLA</h1>
          <p>
            ZILLA helps you create, maintain and organize sticky notes for your
            different projects.
          </p>
          <Button destination="/new-project" text="Create New Project" />
        </div>

        <div>
          <img className="header-image" src={sticky} />
        </div>
      </div>
    </div>
  );
}
export default Home;

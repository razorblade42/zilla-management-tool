import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";
import AllProjects from "./pages/AllProjects";
import Favourites from "./pages/Favourites";
import NotFound from "./pages/NotFound";
import EditProject from "./pages/EditProject";
import AllNotes from "./pages/AllNotes";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="main">
      <Navigation />
      <div className="main-app">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/new-project">
            <NewProject />
          </Route>
          <Route exact path="/all-projects">
            <AllProjects />
          </Route>
          <Route exact path="/favourites">
            <Favourites />
          </Route>
          <Route exact path="/edit-project/:Projectkey">
            <EditProject />
          </Route>
          <Route exact path="/all-notes/:Projectkey">
            <AllNotes />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;

import Nav from "./components/Nav";


import { HashRouter, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Following from "./pages/Following";
import Log from "./pages/Log";
import Register from "./pages/Register"


// styles:
import "./styles/css/style.css";



function App() {
  
  return (
    <HashRouter>
      <Nav />
      <Route path="/" exact component={Index} />
      <Route path="/login" exact component={Log} />
      <Route path="/register" exact component={Register} />
      <Route path="/profile/:username" exact component={Profile} />
      <Route path="/following" exact component={Following} />
    </HashRouter>
  );
}

export default App

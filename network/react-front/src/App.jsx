import Nav from "./components/Nav";


import { HashRouter, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Following from "./pages/Following";

// NO ENTIENDO POR QUE Following con F mayuscula y profile con miniscula la f.


function App() {
  
  return (
    <HashRouter>
      <Nav />
      <Route path="/" exact component={Index} />
      <Route path="/profile/:username" exact component={Profile} />
      <Route path="/following" exact component={Following} />
    </HashRouter>
  );
}

export default App

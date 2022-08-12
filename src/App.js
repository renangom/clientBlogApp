import { Topbar } from "./components/Topbar/Topbar";
import { Home } from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import { Single } from "./pages/Single/Single";
import { Write } from "./pages/Write/Write";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <div>
      <Router>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/write" element={user ? <Write /> : <Login />} />
          <Route path="/settings" element={user ? <Settings /> : <Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

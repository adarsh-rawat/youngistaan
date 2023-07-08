// import logo from './logo.svg';
import './App.css';
import Profile from './components/ProfilePage';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import UploadWork from './components/UploadWork';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={Profile}/>
            <Route path="/reportform" element={UploadWork} />
          </Routes>
      </Router> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/reportform" element={<UploadWork />} />
      </Routes>
    </BrowserRouter>

    </div>

  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/Nav";
import UploadSystem from "./Components/upload/Upload";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Components/login/Login";
import MyAccount from './Components/myAccount/MyAccount';
import Download from './Components/download/download';
import SingUp from './Components/signup/Signup';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<UploadSystem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SingUp />} />
          <Route path='/myAccount' element={<MyAccount></MyAccount>} ></Route>
          <Route path='/file/:id' element={<Download></Download>}></Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

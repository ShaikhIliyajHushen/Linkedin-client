import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Feed from './component/Feed/index'
import Home from './component/Home'
import Network from './component/MyNetwork'
import SignUp from './component/SignUp'
import Login from './component/Login'
import Jobs from './component/Jobs'
import Message from './component/Message'
import Notification from './component/Notification'
import Profile from './component/Profile'
import { UserProvider } from './component/UserContext';

function App() {
  return (
    <>
     <BrowserRouter>
     <UserProvider>
        <Routes>
          <Route path="/Feed" element={<Feed />} >
            <Route index element={<Home />} />
            <Route path='network' element={<Network />} />
            <Route path='jobs' element={<Jobs />} />
            <Route path='message' element={<Message />} />
            <Route path='notify' element={<Notification />} />
            <Route path='profile/:ids' element={<Profile />} />
            <Route path='profile' element={<Profile />} />

          </Route>
          <Route path="/create_account" element={<SignUp/>} />
          <Route path="/" element={<Login/>} />
        </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

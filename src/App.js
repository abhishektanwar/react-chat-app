import './App.css';
import { Route, BrowserRouter as Router, Switch,Redirect } from 'react-router-dom'
import Home from './Components/Home/Home'
import Chat from './Components/Chat/Chat'
import Profile from './Components/Profile/Profile'
import SignUp from './Components/SignUp/SignUp'
import Login from './Components/Login/Login'
import firebase from 'firebase'
import { toast,ToastContainer } from 'react-toastify'
import { useAuth } from './Context/AuthContext'
import { AuthProvider } from './Context/AuthContext';
import { ConversationProvider } from './Context/ConversationContext';
import PrivateRoute from './Components/PrivateRoutes'
import Sidebar from './Components/Sidebar/Sidebar'
function App() {
  const showToast = (type,message) => {
    switch(type){
      case 0:
        toast.warning(message)
        break
      case 1:
        toast.success(message)
        break
      default:
        break
    }
  }

  return (
    <Router>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position={toast.POSITION.TOP_RIGHT}
      />
      <ConversationProvider>
        <AuthProvider>
          <div className="App">
            <Switch>
              <PrivateRoute exact path="/" component = {()=><Home />} />
              <Route  path="/login" component = {()=><Login showToast={showToast}/>} />
              <Route  path="/signup" component = {()=><SignUp showToast={showToast}/>} />
              <Route  path="/chat" component = {()=><Chat showToast={showToast}/>} />
              <Route exact path="/home" component = {()=><Home showToast={showToast}/>} />
            
            
            </Switch>
            
          </div>
        </AuthProvider>
        </ConversationProvider>
    </Router>
    
    
  );
}

export default App;

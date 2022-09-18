import {useContext} from 'react';
import { UserContext } from './context/auth.context';
import {Routes,Route} from 'react-router-dom'
import Auth from './routes/auth/auth.component';
import Home from './routes/home/home.component';
function App() {

  const {userInfo} = useContext(UserContext)
  console.log(userInfo)
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Auth />}/>
        <Route path='home' element={<Home />}/>
      </Route>
    </Routes>
    
  );
}

export default App;

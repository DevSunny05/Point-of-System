
import './App.css';
import 'antd/dist/reset.css';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Item from './pages/Item';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/items' element={<ProtectedRoute><Item/></ProtectedRoute>}/>
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export function ProtectedRoute({children}){
  if(localStorage.getItem('auth')){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}

export default App;

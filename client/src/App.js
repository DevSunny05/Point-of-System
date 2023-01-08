
import './App.css';
import 'antd/dist/reset.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Item from './pages/Item';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/items' element={<Item/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;

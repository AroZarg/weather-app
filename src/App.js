import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Wrapper from './Layout/Wrapper';
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
      <ToastContainer/>
       <BrowserRouter>
         <Routes>
          <Route path="/" element={<Wrapper><Home/></Wrapper>}/>
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;

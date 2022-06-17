import './App.css';
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import Header from './component/header/header';
import GetAllData from './component/data/GetAllData';
import NotFound from './component/NotFound';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<GetAllData />}/>
      <Route path='*'
          element={ window.location.pathname === "/process/payment" ? null : 
            <NotFound/>
          }
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

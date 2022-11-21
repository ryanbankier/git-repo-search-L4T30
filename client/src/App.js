import logo from './logo.svg';
//import './App.css';
import './css/custom.css'
import Main from './components/Main';



import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"/>
      <BrowserRouter>
          <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Movies from "./components/movies/Movies";

// Views


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
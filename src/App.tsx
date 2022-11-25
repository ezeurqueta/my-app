import { Routes, Route } from "react-router-dom";
import Login from "./Pages/login/Login";
import Movies from "./Pages/movies/Movies";
import { RequireAuth } from "react-auth-kit";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/Movies"
        element={
          <RequireAuth loginPath="/">
            <Movies />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;

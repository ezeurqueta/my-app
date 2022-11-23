import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Movies from "./components/movies/Movies";
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

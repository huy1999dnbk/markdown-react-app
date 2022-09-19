import { useContext, useEffect } from "react";
import { UserContext } from "./context/auth.context";
import { Routes, Route } from "react-router-dom";
import Auth from "./routes/auth/auth.component";
import Home from "./routes/home/home.component";
import NavbarWrapper from "./routes/navbar/navbar.component";
import { useNavigate } from "react-router-dom";
function App() {
  let navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo.uid !== "") {
      navigate("/home");
    }
  }, [userInfo]);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Auth />} />
        <Route element={<NavbarWrapper />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

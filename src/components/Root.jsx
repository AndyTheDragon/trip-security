import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import apiFacade from "../apiFacade";

const Root = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (user, pass) => {
        apiFacade.login(user, pass).then(()=> setIsLoggedIn(true)); 
    }
    const handleLogout = () => {
        apiFacade.logout();
        setIsLoggedIn(false);
    }
  return (
    <>
      <Header login={handleLogin} logout={handleLogout} />

      <Outlet />
    </>
  );
};
export default Root;

import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import history from "./services/history";
import Routes from "./Routes";
import Navigationbar from "./Components/Navbar/Navbar";
import { UserProvider } from "./Context/userContext";
import tasksItemsContext from "./Context/tasksItemsContext";
import projectContext from "./Context/projectContext";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

//Loading the firebase configuration
firebase.initializeApp(firebaseConfig);
export const AuthContext = React.createContext(null);

function App() {
  //maintaining the user's login status
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNavbar, setIsNavbar] = useState(true);

  //initial user status
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState("");

  //Reading the current user session from Firebase authentication
  function readSession() {
    const user = window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    );
    if (user) setLoggedIn(true);
  }
  useEffect(() => {
    readSession();
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/error") {
      setIsNavbar(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <UserProvider>
        <Router history={history}>
          <tasksItemsContext.Provider value={{ tasks, setTasks }}>
            <projectContext.Provider value={{ project, setProject }}>
              {isNavbar ? <Navigationbar /> : ""}
              <Routes />
            </projectContext.Provider>
          </tasksItemsContext.Provider>
        </Router>
      </UserProvider>
    </AuthContext.Provider>
  );
}

export default App;

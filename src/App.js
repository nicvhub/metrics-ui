import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

const apiClient = axios.create({
  baseURL: "https://nameless-thicket-31094.herokuapp.com",
  withCredentials: true,
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    apiClient
      .get("/signin")
      .then(function (response) {
        if (response.status === 204) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch(function (error) {
        setLoggedIn(false);
      });
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {loggedIn ? <h1>LOGGED IN</h1> : <h1>NOT LOGGED IN</h1>}
        <input
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          id="password"
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            apiClient.get("/sanctum/csrf-cookie").then((response) => {
              apiClient
                .post("/signin", {
                  email: email,
                  password: password,
                })
                .then(function (response) {
                  if (response.status === 204) {
                    login();
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
          }}
        >
          login
        </button>
      </header>
    </div>
  );
}

export default App;

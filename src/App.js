import axios from "axios";
import { useState } from "react";
import "./App.css";

const apiClient = axios.create({
  baseURL: "http://localhost/",
  withCredentials: true,
});

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="App">
      <header className="App-header">
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
                  console.log(response);
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

import axios from "axios";
import "./App.css";

const apiClient = axios.create({
  baseURL: "http://localhost/",
  withCredentials: true,
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <input id="username"></input>
        <input id="password"></input>
        <button
          onClick={() => {
            apiClient
              .get("/sanctum/csrf-cookie")
              .then((response) => {
                apiClient
                  .post("/signin", {
                    email: "nicolasvenegasparker@gmail.com",
                    password: "whiskers2012",
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

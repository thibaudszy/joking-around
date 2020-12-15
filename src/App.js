import "./App.css";
import Joke from "./Components/Joke";

function App() {
  return (
    <div className="App">
      <div className="header">
        {" "}
        <h1> Amazing programming jokes </h1>{" "}
      </div>
      <div className="Body">
        <Joke />
      </div>
    </div>
  );
}

export default App;

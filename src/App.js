import logo from "./logo.svg";
import avatar from "./avatar-ai.png";
import "./App.css";
import Dictaphone from "./components/Dictaphone";
import BetterUI from "./components/BetterUI";
import InteractiveUI from "./components/InteractiveUI";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src={avatar} style={{ width: "200px", height: "300px" }}></img>
        {/* <Dictaphone /> */}
        {/* <BetterUI /> */}
        <InteractiveUI />
      </header>
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Dictaphone from "./components/Dictaphone";
import BetterUI from "./components/BetterUI";
import InteractiveUI from "./components/InteractiveUI";
// import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <b>Virtual Being - ChenYu </b>
        <i>
          currently only support Chrome web browser, and English. More features
          coming soon.
        </i>

        {/* <Dictaphone /> */}
        {/* <BetterUI /> */}
        <InteractiveUI />
        {/* <Test></Test> */}
      </header>
    </div>
  );
}

export default App;

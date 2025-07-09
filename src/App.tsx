import { Board } from "./components/Board/Board";
import "./App.css";

export function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Get It Done!</h1>
      <Board />
    </div>
  );
}

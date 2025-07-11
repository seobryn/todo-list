import { Board } from "./components/Board/Board";
import { Toaster } from "./components/Toaster/Toaster";
import "./App.css";

export function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Get It Done!</h1>
      <Toaster />
      <Board />
    </div>
  );
}

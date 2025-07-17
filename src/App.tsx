import { Board } from "./components/Board/Board";
import { Toaster } from "./components/Toaster/Toaster";
import "./App.css";
import { IntlProvider, Text } from "preact-i18n";
import es from "./i18n/es.json";
import en from "./i18n/en.json";

export function App() {
  return (
    <IntlProvider definition={navigator.language.startsWith("es") ? es : en}>
      <div className="app-container">
        <h1 className="app-title">
          <Text id="main.appTitle">Get It Done!</Text>
        </h1>
        <Toaster />
        <Board />
      </div>
    </IntlProvider>
  );
}

import GameProvider from "@contexts/GameProvider";
import ErrorBoundary from "./ErrorBoundary";
import Game from "./Game";
import "./App.module.scss";

function App() {
  return (
    <ErrorBoundary fallback={<h1>Somehing went wrong!</h1>}>
      <GameProvider>
        <Game />
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;

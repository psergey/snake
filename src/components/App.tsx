import GameProvider from "@contexts/GameProvider";
import ErrorBoundary from "./ErrorBoundary";
import ErrorPage from "./ErrorPage";
import Game from "./Game";
import "./App.module.scss";

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <GameProvider>
        <Game />
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;

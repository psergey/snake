import GameProvider from "@/GameProvider";
import Game from "./Game";
import "./App.module.scss";

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;

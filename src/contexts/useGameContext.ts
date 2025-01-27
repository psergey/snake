import { createContext, useContext } from "react";

import { GameState } from "@models/gameState";

export const GameContext = createContext({} as GameState);

export const useGameContext = () => useContext(GameContext);

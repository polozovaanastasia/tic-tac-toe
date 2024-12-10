import React from "react";
import { useState } from "react";
import "./App.css";
import GameInfo from "./components/GameInfo/GameInfo.tsx";
import GameCell from "./components/GameCell/GameCell.tsx";
import useGameState from "./hooks/useGameState.ts";

function App() {
    const {
        cells,
        currentStep,
        winnerSequence,
        isDraw,
        onCellClickHandler,
        restartGame,
    } = useGameState();
    return (
        <div className="app">
            <div className="game">
                <GameInfo
                    currentStep={currentStep}
                    isWinner={Boolean(winnerSequence)}
                    isDraw={isDraw}
                    restartGame={restartGame}
                />
                <div
                    className={`game-fild ${
                        winnerSequence || isDraw
                            ? "game_disabled"
                            : "game_started"
                    }`}
                >
                    {cells.map((cell, index) => {
                        const onClickHandler = () => {
                            onCellClickHandler(cell, index);
                        };

                        return (
                            <GameCell
                                cell={cell}
                                index={index}
                                currentStep={currentStep}
                                isWinner={!!winnerSequence?.includes(index)}
                                onClickHandler={onClickHandler}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;

import React from "react";
import { useState } from "react";
import "./App.css";

type CellType = null | typeof SYMBOL_X | typeof SYMBOL_O;
type SymbolType = "X" | "O";

const SYMBOL_X: SymbolType = "X";
const SYMBOL_O: SymbolType = "O";

function App() {
    const [cells, setCells] = useState<Array<CellType>>(Array(9).fill(null));
    const [currentStep, setCurrentStep] = useState<SymbolType>(SYMBOL_O);
    const [winnerSequence, setWinnerSequence] = useState<
        Array<number> | undefined
    >();

    const getSymbolClassName = (symbol) => {
        if (symbol === SYMBOL_X) return "symbol-x";
        if (symbol === SYMBOL_O) return "symbol-o";
        return "";
    };

    const renderSymbol = (symbol) => (
        <span className={getSymbolClassName(symbol)}>{symbol}</span>
    );

    const computeWinner = (cells) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c])
                return [a, b, c];
        }
    };

    const isDraw = cells.every((cell) => cell != null);

    const restartGame = () => {
        setCells(Array(9).fill(null));
        setCurrentStep(SYMBOL_O);
        setWinnerSequence();
    };
    return (
        <div className="app">
            <div className="game">
                <div className="game-info">
                    {winnerSequence || isDraw ? (
                        <div className="game-result">
                            {winnerSequence ? (
                                <span>Победитель: {currentStep}</span>
                            ) : (
                                <span>О, это ничья. Сыграем еще раз?</span>
                            )}
                            <button
                                className="game-restart"
                                onClick={restartGame}
                            >
                                Restart
                            </button>
                        </div>
                    ) : (
                        <div className="game-step">
                            Ходит: {renderSymbol(currentStep)}
                        </div>
                    )}
                </div>
                <div
                    className={`game-fild ${
                        winnerSequence ? "game_disabled" : "game_started"
                    }`}
                >
                    {cells.map((cell, index) => {
                        const onClickHandler = () => {
                            if (cell || winnerSequence) return;
                            const cellsCopy = [...cells];
                            cellsCopy[index] = currentStep;
                            setCells(cellsCopy);

                            const winner = computeWinner(cellsCopy);

                            if (winner) {
                                setWinnerSequence(winner);
                            } else {
                                setCurrentStep(
                                    currentStep === SYMBOL_O
                                        ? SYMBOL_X
                                        : SYMBOL_O
                                );
                            }
                        };

                        const isWinner = winnerSequence?.includes(index);

                        return (
                            <span
                                key={index}
                                className={`game-cell ${
                                    isWinner ? "game-cell_winner" : ""
                                }`}
                                onClick={onClickHandler}
                            >
                                {renderSymbol(cell)}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;

import React from "react";
import { useState } from "react";
import "./App.css";
import GameInfo from "./components/GameInfo/GameInfo.tsx";
import GameCell from "./components/GameCell/GameCell.tsx";

export type CellType = null | SymbolType;
export type SymbolType = "X" | "O";

export const SYMBOL_X: SymbolType = "X";
export const SYMBOL_O: SymbolType = "O";

function App() {
    const [cells, setCells] = useState<Array<CellType>>(Array(9).fill(null));
    const [currentStep, setCurrentStep] = useState<SymbolType>(SYMBOL_O);
    const [winnerSequence, setWinnerSequence] = useState<
        Array<number> | undefined
    >();

    const onCellClickHandler = (cell: CellType, index: number) => {
        if (cell || winnerSequence) return;
        const cellsCopy = [...cells];
        cellsCopy[index] = currentStep;
        setCells(cellsCopy);

        const winner = computeWinner(cellsCopy);

        if (winner) {
            setWinnerSequence(winner);
        } else {
            setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
        }
    };

    const computeWinner = (cells: Array<CellType>) => {
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

    const isDraw = cells.every((cell) => cell);

    const restartGame = () => {
        setCells(Array(9).fill(null));
        setCurrentStep(SYMBOL_O);
        setWinnerSequence(undefined);
    };
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

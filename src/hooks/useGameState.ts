import { useState } from "react";
import { CellType, SYMBOL_O, SYMBOL_X, SymbolType } from "../types";

function useGameState() {
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

    return {
        cells,
        currentStep,
        winnerSequence,
        isDraw,
        onCellClickHandler,
        restartGame,
    };
}

export default useGameState;

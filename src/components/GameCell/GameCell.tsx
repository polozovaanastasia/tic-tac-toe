import { CellType, SymbolType } from "../../App";
import GameSymbol from "../GameSymbol/GameSymbol";

type GameCellPropsType = {
    cell: CellType;
    index: number;
    currentStep: SymbolType;
    isWinner: boolean;
    onClickHandler: () => void;
};

function GameCell({
    cell,
    index,
    currentStep,
    isWinner,
    onClickHandler,
}: GameCellPropsType) {
    const GameCellClassName = `game-cell ${
        isWinner ? `game-cell_winner game-cell_${currentStep}` : ""
    }`;

    return (
        <span
            key={index}
            className={GameCellClassName}
            onClick={onClickHandler}
        >
            <GameSymbol symbol={cell} />
        </span>
    );
}

export default GameCell;

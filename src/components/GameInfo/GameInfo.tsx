import { SymbolType } from "../../App";
import GameSymbol from "../GameSymbol/GameSymbol";

type GameInfoPropsType = {
    currentStep: SymbolType;
    isWinner: boolean;
    isDraw: boolean;
    restartGame: () => void;
};

function GameInfo({
    currentStep,
    isWinner,
    isDraw,
    restartGame,
}: GameInfoPropsType) {
    const GameResultClassName = `game-result ${
        isWinner ? `game-result-winner_${currentStep}` : ""
    }`;

    if (isWinner || isDraw) {
        return (
            <div className="game-info">
                <div className={GameResultClassName}>
                    {isWinner ? (
                        <span>
                            Победитель: <GameSymbol symbol={currentStep} />
                        </span>
                    ) : (
                        <span>О, это ничья. Сыграем еще раз?</span>
                    )}

                    <button className="game-restart" onClick={restartGame}>
                        Restart
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="game-info">
            <div className="game-step">
                Ходит: <GameSymbol symbol={currentStep} />
            </div>
        </div>
    );
}

export default GameInfo;

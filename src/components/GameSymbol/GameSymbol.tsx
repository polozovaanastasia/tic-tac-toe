import { CellType, SYMBOL_O, SYMBOL_X } from "../../types/index";

type GameSymbolPropsType = {
    symbol: CellType;
};

function GameSymbol({ symbol }: GameSymbolPropsType) {
    const getSymbolClassName = (symbol: CellType) => {
        if (symbol === SYMBOL_X) return "symbol-x";
        if (symbol === SYMBOL_O) return "symbol-o";
        return "";
    };
    return (
        <span className={`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
    );
}

export default GameSymbol;

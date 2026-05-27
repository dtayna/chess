import { Board } from "./board";
import { Pawn } from "./pieces/pawn";

const board = new Board();

function setUpBoard() : void {
    if ( !board ) return;
    for ( let i = 0; i < 8 ; i++){
        board.grid[1]![i] = new Pawn( "white", { row: 1, col: i } );
        board.grid[6]![i] = new Pawn( "black", { row: 6, col: i } );
    }
}

function init() : void {
    setUpBoard();
    board.showBoard();
    const p = board.grid[1]![0];
    if( p && p.canMove( { row: 3, col: 0 }, board ) ){
        p.move( { row: 3, col: 0 }, board );
    }
    board.showBoard();
    
}

init();